// const videoQueryRepo = {
//   getVideos(): VideoOutputModel[] {
//     const dbVideos: DBvideo[] = [];
//     const authors: DBAuthor[] = [];

//     return dbVideos.map((dbVideo) => {
//       const author = authors.find((a) => a._id === dbVideo.authorId);

//       return {
//         id: dbVideo._id,

//         title: dbVideo.title,
//         author: {
//           id: author!._id,
//           name: author!.firstName + " " + author!.lastName,
//         },
//       };
//     });
//   },
// },

// getVideoById(id: string): VideoOutputModel {
//     const dbVideos: DBvideo={
//       _id: "651",
//       title: "sdfvsd",
//       authorId: "612"
//     }
//     const author: DBAuthor ={
//       _id: "651",
//       lastName: "sdfvsd",
//       firstName: "612"
//     }
//    return this._mapDBVideoToVideoOutputModel(dbVideo, author)
// }

//   _mapDBVideoToVideoOutputModel(DBVideo: DBVideo, dbAuthor: DBAuthor){
//      return {
//         id: dbVideo._id,

//         title: dbVideo.title,
//         author: {
//           id: author!._id,
//           name: author!.firstName + " " + author!.lastName,
//         }
//       }
//   }

// type DBvideo = {
//   _id: string;
//   title: string;
//   authorId: string;
// };

// type DBAuthor = {
//   _id: string;
//   firstName: string;
//   lastName: string;
// };

// type VideoOutputModel = {
//   id: string;
//   title: string;
//   author: {
//     id: string;
//     name: string;
//   };
// };
