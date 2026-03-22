import { db, storage } from "../lib/firebase";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  limit,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

// This authentication function is called in Signup page to check if username is already
// taken
export async function doesUserNameExists(username) {
  //creating a query to search collection with db(firebase lib file) refrence
  //then searching in users collections
  //applying where keyword
  //look at firebase doc for more
  const q = query(collection(db, "users"), where("username", "==", username));

  //using getDocs function to send the query and get a collection fo docs
  //store them in results
  const results = await getDocs(q);

  return results.docs.length > 0;
}

export async function getUserByUserName(username) {
  //creating a query to search collection with db(firebase lib file) refrence
  //then searching in users collections
  //applying where keyword
  //look at firebase doc for more
  const q = query(collection(db, "users"), where("username", "==", username));

  //using getDocs function to send the query and get a collection fo docs
  //store them in results
  const result = await getDocs(q)
    .then((res) => res.docs)
    .catch((err) => {
      console.log(err);
    });

  const user = result.map((item) => {
    return {
      ...item.data(),
      docid: item.id,
    };
  });

  return user;
}

//creating a function to add a user to collection
export async function addUserDocument(username, uid, email, fullname) {
  //creating a query
  //addDoc is differnet than setDoc
  //doc is different than collection
  await addDoc(collection(db, "users"), {
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    fullname,
    uid: uid,
    following: [],
    followers: [],
    date: Date.now(),
  });
}

// writing a service call to get user by user id since we already have the userId from
// authentication part of our app

export async function getUserObjByID(userID) {
  //creating a query. This query will try and find userID (uid).

  const q = query(collection(db, "users"), where("uid", "==", userID));

  //findind the user to getdocs firebase function and catching errors
  //Edit 1: Found a error of firebase operator using catch
  const result = await getDocs(q).catch((err) => {
    console.log(err);
  });

  //mapping data to user.Since there will be only doc returned, mapping will only happen once
  // because uid is unique in nature
  //Remember map excepts a return. Other way to short hand write this statement would be
  // .map((item) => ({ ...item.data, docID:item.id, }))
  //here we are returning a object that consists of doc.data and doc id

  //map function **returns a array** with same length as parent array.

  const user = result.docs.map((item) => {
    //userdata is hidden in item.data()
    //sending docID because this will allow us to update User's followers and following
    //in the updateActiveUserFollowing service call

    return {
      ...item.data(),
      docID: item.id,
    };
  });

  return user;
}

// Service call to get suggestions from Firestore. Active userID is passed as a argument.
// Using UserID to match the userID's of suggestions and checking if they are not followed
// by the active user.If not, then they are passed as a result
export async function getSuggestedUsers(userID, following) {
  //getting users if they do not have the same id as active user
  const q = query(
    collection(db, "users"),
    where("uid", "!=", userID),
    limit(5)
  );

  const result = await getDocs(q)
    .then((res) => res.docs)
    .catch((err) => {
      console.log(err);
    });

  // mapping the result and then filtering the array checking if the
  // following arra of active User has any of the profile id
  // if not then storing them in suggestions and returning them
  const suggestions = result
    .map((user) => {
      return {
        ...user.data(),
        docID: user.id,
      };
    })
    .filter((profile) => !following.includes(profile.uid));
  return suggestions;
}

export async function updateActiveUserFollowing(
  profileUid,
  hasfollowed, // do i follow this account(true/false)
  docID
) {
  console.log("follow=>", hasfollowed);
  const docRef = doc(db, "users", docID);
  await updateDoc(docRef, {
    following: !hasfollowed ? arrayUnion(profileUid) : arrayRemove(profileUid),
  }).catch((err) => {
    console.log(err);
  });
}

export async function updateSuggestedUserFollowers(
  userId,
  hasfollowed,
  profileUserDocId
) {
  const docRef = doc(db, "users", profileUserDocId);
  await updateDoc(docRef, {
    followers: !hasfollowed ? arrayUnion(userId) : arrayRemove(userId),
  }).catch((err) => {
    console.log(err);
  });
}

//-> This function will need to retutn post,Active user Like Status(true/false), Post creator username
export async function getPosts(userId, following) {
  const q = query(
    collection(db, "posts"),
    where("userid", "in", following),
    limit(5)
  );

  const results = await getDocs(q)
    .then((res) => res.docs)
    .catch((err) => {
      console.log(err);
    });

  //-> Mapping post with post.data(), docid, liked status and username of creator
  //-> We need to use await Promise.all because we need to do a async request for username
  const posts = await Promise.all(
    results.map(async (post) => {
      //checking if user has like this post or not
      let likedByActiveUser = false;
      if (post.data().likes.includes(userId)) likedByActiveUser = true;

      //getting username of the creator of post
      const [{ username, profileUrl }] = await getUserObjByID(
        post.data().userid
      );

      return {
        ...post.data(),
        likedByActiveUser,
        username,
        profileUrl,
        docid: post.id,
      };
    })
  );

  return posts;
}

//-> This function will toggle add or remove userID from the likes array in the firestore
//-> depending upon if the user likes the photo or not(true/false)
export async function toggleLikes(postId, ActiveUserId, likedStatusActiveUser) {
  // if the likedStatusActiveUSer is false , then we add the id
  const docRef = doc(db, "posts", postId);
  await updateDoc(docRef, {
    likes: !likedStatusActiveUser
      ? arrayUnion(ActiveUserId)
      : arrayRemove(ActiveUserId),
  }).catch((err) => {
    console.log(err);
  });
}

export async function addUserComment(postId, UserName, caption) {
  const docRef = doc(db, "posts", postId);
  await updateDoc(docRef, {
    comments: arrayUnion({
      caption: caption,
      username: UserName,
    }),
  }).catch((err) => {
    console.log(err);
  });
}

export async function getPostsByUserId(userId) {
  const q = query(collection(db, "posts"), where("userid", "==", userId));

  const result = await getDocs(q).then((res) => res.docs);

  const posts = result.map((post) => {
    return {
      ...post.data(),
      docid: post.id,
    };
  });

  return posts;
}

export async function hasUserFollowedProfile(activeUserId, profileUserDocId) {
  const docRef = doc(db, "users", profileUserDocId);

  const result = await getDoc(docRef).then((res) => res.data()?.followers);

  return result.includes(activeUserId);
}

export async function uploadProfilePic(file, userId, activeUserDocId) {
  const storageRef = ref(storage, `profiles/${userId}/${file.name}`);
  const uploadTaskUrl = await uploadBytes(storageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref).then((url) => {
      return url;
    });
  });

  const docRef = doc(db, "users", activeUserDocId);

  await updateDoc(docRef, {
    profileUrl: uploadTaskUrl,
  });
}

export async function createPost(caption, previewUrl, userId, filename) {
  const storageRef = ref(storage, `posts/${userId}/${filename}`);
  const uploadTaskUrl = await uploadBytes(storageRef, previewUrl)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref).then((url) => {
        return url;
      });
    })
    .catch((err) => {
      console.error(err);
    });

  await addDoc(collection(db, "posts"), {
    imageSrc: uploadTaskUrl,
    caption,
    userid: userId,
    likes: [],
    comments: [],
    date: Date.now(),
  }).catch((err) => {
    console.error(err);
  });
}
