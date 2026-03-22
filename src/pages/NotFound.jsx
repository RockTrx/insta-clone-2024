import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
 const [count, setCount] = useState(5)
  
 useEffect(() => {
    document.title = "404 -Not Found";
    if(count === 0) return navigate('/')
    const id = setTimeout(() => {
      setCount(count-1)
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <div className="rel-cc">
      <div className="abs">
        <h3>Not Found! Redirecting to Home in {count}</h3>
      </div>
    </div>
  );
}

export default NotFound;
