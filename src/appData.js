let player = new Audio("/static/empty.mp3");

export default {
  state: "closed",
  currentCatagory: "Library",
  categories: ["Browse", "Library", "Visualize"],
  currentPage: "Songs",
  pages: ["Songs", "Artists", "Albums", "Playlists"],
  isDone: false,
  searchResults: {
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
    youtube: [],
    soundcloud: []
  },
  library: {
    song_metas: [
      {
        artists: [{data: {name: "Journey"}}],
        title: "Don't Stop Believin'",
        album: { data: {
          title: "Escape",
          artists: [{data: {name: "Journey"}}],
          art: ["https://is2-ssl.mzstatic.com/image/thumb/Music/v4/57/9b/c3/579bc37b-cffd-f97e-f663-c52b3b3c97a0/source/1000x1000bb.jpg"],
        }}
      },
      {
        artists: [{data: {name: "Noisestorm"}}],
        title: "Crab Rave",
        album: { data: {
          artists: [{data: {name: "Noisestorm"}}],
          title: "Crab Rave - Single",
          art: ["https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/6f/c2/ad/6fc2ad48-f80b-bf7b-522a-f9bbaf4b46da/source/1000x1000bb.jpg"],
        }}
      },
      {
        artists: [{data: {name: "Porter Robinson"}}, {data: {name: "Madeon"}}],
        title: "Shelter",
        album: { data: {
          artists: [{data: {name: "Porter Robinson"}}, {data: {name: "Madeon"}}],
          title: "Shelter - Single",
          art: ["https://is3-ssl.mzstatic.com/image/thumb/Music18/v4/be/2f/ac/be2fac38-995d-adda-2fcc-286cbb444fb5/source/1000x1000bb.jpg"],
        }}
      }
    ],
    songs: [],
    albums: [],
    artists: []
  },
  currentSong: {
    song: {
      data: {
        metadata: {
          data: {
            artists: [{data: { name: ''}}],
            title: '',
            album: { data: {
              art: ['https://i.imgur.com/HIcLTbc.png'],
              title: '',
              artists: [{data: { name: ''}}]
            }}
          }
        }
      }
    },
    currentTime: "0:00",
    duration: "0:00"
  },
  player: player,
  search: "",
  modal: {
    active: false,
    type: "",
    content: {}
  }
};
