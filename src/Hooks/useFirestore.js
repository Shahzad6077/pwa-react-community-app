import { useState, useEffect } from "react";
import { fbCloudDb } from "./useFirebase";

const UseFirestore = (collectionName, orderBy) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let unSubscribe;
    (async () => {
      const collectionRef = fbCloudDb.collection(collectionName);
      unSubscribe = collectionRef
        .orderBy(orderBy, "desc")
        .onSnapshot(querySnapshot => {
          const arr = querySnapshot.docs.map(d => {
            return { docId: d.id, ...d.data() };
          });
          setList(arr);
          setLoading(false);
        });
    })();
    return () => {
      unSubscribe && unSubscribe();
    };
  }, [collectionName, orderBy]);

  return [loading, list];
};

export default UseFirestore;
