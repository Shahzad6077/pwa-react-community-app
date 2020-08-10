import { useState, useEffect } from "react";
import { fbCloudDb, fbStorage, serverTimestamp } from "./useFirebase";

const useStorage = file => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    // const storageRef = fbStorage.ref(file.name);
    // const collectionRef = fbCloudDb.collection("images");

    // storageRef.put(file).on(
    //   "state_changed",
    //   snap => {
    //     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    //     setProgress(percentage);
    //   },
    //   err => {
    //     setError(err);
    //   },
    //   async () => {
    //     const url = await storageRef.getDownloadURL();
    //     const createdAt = serverTimestamp();
    //     // await collectionRef.add({ url, createdAt });
    //     setUrl(url);
    //   }
    // );
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function() {
        setUrl(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }

    return () => reader.removeEventListener("load", function() {}, false);
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
