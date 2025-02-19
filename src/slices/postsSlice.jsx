// // import { createSlice } from "@reduxjs/toolkit";

// // const postsSlice = createSlice({
// //   name: "posts",
// //   initialState: [],
// //   reducers: {
// //     setPosts: (state, action) => action.payload,
// //     addPost: (state, action) => {
// //       state.push(action.payload);
// //     },
// //     editPost: (state, action) => {
// //       const index = state.findIndex((post) => post.id === action.payload.id);
// //       if (index !== -1) state[index] = action.payload;
// //     },
// //     deletePost: (state, action) => {
// //       return state.filter((post) => post.id !== action.payload);
// //     },
// //   },
// // });

// // export const { setPosts, addPost, editPost, deletePost } = postsSlice.actions;
// // export default postsSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const FIREBASE_URL = "https://your-firebase-project-id.firebaseio.com/posts.json";

// const postsSlice = createSlice({
//   name: "posts",
//   initialState: [],
//   reducers: {
//     setPosts: (state, action) => action.payload, // تعيين المنشورات عند الجلب
//     addPost: (state, action) => {
//       state.push(action.payload);
//     },
//   },
// });

// export const { setPosts, addPost } = postsSlice.actions;

// export const fetchPosts = () => async (dispatch) => {
//   try {
//     const response = await axios.get(FIREBASE_URL);
//     if (response.data) {
//       const postsArray = Object.keys(response.data).map((id) => ({
//         id,
//         ...response.data[id],
//       }));
//       dispatch(setPosts(postsArray));
//     }
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//   }
// };

// export const addPostToFirebase = (newPost) => async (dispatch) => {
//   try {
//     const response = await axios.post(FIREBASE_URL, newPost);
//     dispatch(addPost({ id: response.data.name, ...newPost }));
//   } catch (error) {
//     console.error("Error adding post:", error);
//   }
// };

// export default postsSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs, addDoc } from "../firebase";

// إنشاء Slice للإدارة في Redux
const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setPosts: (state, action) => action.payload, // تعيين البيانات عند الجلب
    addPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;

// **🌟 جلب المنشورات من Firestore**
export const fetchPosts = () => async (dispatch) => {
  try {
    const db = getFirestore(); // الاتصال بـ Firestore
    const querySnapshot = await getDocs(collection(db, "posts"));

    let postsArray = [];
    querySnapshot.forEach((doc) => {
      postsArray.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setPosts(postsArray)); // تحديث الحالة في Redux
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// **🌟 إضافة منشور جديد إلى Firestore**
export const addPostToFirebase = (newPost) => async (dispatch) => {
  try {
    const db = getFirestore();
    const docRef = await addDoc(collection(db, "posts"), newPost);

    dispatch(addPost({ id: docRef.id, ...newPost })); // تحديث الحالة في Redux
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export default postsSlice.reducer;
