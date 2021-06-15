const videos = [
  {
    _id: "wY6UyatwVTA",
    thumbnail: "https://img.youtube.com/vi/wY6UyatwVTA/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnjdwk_H9e0CxY8VlVJ0zibRkwlsUkhH1WlxSQRpz58=s176-c-k-c0x00ffffff-no-rj",

    title:
      "India claim stunning series win, end Australia's Gabba streak | Vodafone Test Series 2020-21",
    channel: "cricket.com.au",
    views: 0,
    date: "3 months ago",
  },
  {
    _id: "No8-mBek3rs",
    thumbnail: "https://img.youtube.com/vi/No8-mBek3rs/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwni8alaul0s34_VP1Vgo9zQvdvXPacigPR_40AgdpA=s88-c-k-c0x00ffffff-no-rj",
    title: "All Sports Golf Battle 3 | Dude Perfect",
    channel: "Dude Perfect",
    views: 0,
    date: "3 years ago",
  },
  {
    _id: "AfIgzMT81w0",
    thumbnail: "https://img.youtube.com/vi/AfIgzMT81w0/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnh2jaD54BuTMBtmEOxPmqPFpOPy3mAyWIFVvGXPgg=s88-c-k-c0x00ffffff-no-rj",
    title: "Unforgettable Legendary Goals in Football History #2",
    channel: "BTGL TV",
    views: 0,
    date: "2 years ago",
  },
  {
    _id: "zkRDrAfdKig",
    thumbnail: "https://img.youtube.com/vi/zkRDrAfdKig/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwngLM0QFLdlGCrkuDRsnjqPnkOPO_-d2ljgEGWXI=s176-c-k-c0x00ffffff-no-rj-mo",
    title:
      "Chelsea wins the Champions League! Craig Burley LAUDS Thomas Tuchel’s turnaround | ESPN FC",
    channel: "ESPN FC",
    views: 0,
    date: "1 day ago",
  },
  {
    _id: "yxvaURdWJS8",
    thumbnail: "https://img.youtube.com/vi/yxvaURdWJS8/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwni9Kb70j90xSwFzQtbjlq4vR4ZC0HB61Wd71sIDiA=s88-c-k-c0x00ffffff-no-rj",
    title: "Impossible Goalkeeper Saves in Football",
    channel: "TKHD",
    views: 0,
    date: "1 month ago",
  },
  {
    _id: "b_JolrQC5mE",
    thumbnail: "https://img.youtube.com/vi/b_JolrQC5mE/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnhHWy6peVIYHfnmgauOvWOe-dj8jp3XaA3NFjlVmQ=s88-c-k-c0x00ffffff-no-rj",
    title:
      "Australia Bowled Out For 60 | 4th Ashes Test Trent Bridge 2015 - Full Highlights",
    channel: "England & Wales Cricket Board",
    views: 0,
    date: "4 years ago",
  },
  {
    _id: "em0cfhGE5HM",
    thumbnail: "https://img.youtube.com/vi/em0cfhGE5HM/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnj74HUcPMXuvCLK6hlkf3T1s2XAsG1haOqboLx19g=s88-c-k-c0x00ffffff-no-rj",
    title: "Rugby World Cup 2019 Semi-Final: England v New Zealand",
    channel: "World Rugby",
    views: 0,
    date: "1 year ago",
  },
  {
    _id: "EyHY5YkYAJg",
    thumbnail: "https://img.youtube.com/vi/EyHY5YkYAJg/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnhHWy6peVIYHfnmgauOvWOe-dj8jp3XaA3NFjlVmQ=s88-c-k-c0x00ffffff-no-rj",
    title: "Final Over Drama At The Oval | England v India 2007 - Highlights",
    channel: "England & Wales Cricket Board",
    views: 0,
    date: "3 years ago",
  },
  {
    _id: "h6qoje68inc",
    thumbnail: "https://img.youtube.com/vi/h6qoje68inc/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnhHWy6peVIYHfnmgauOvWOe-dj8jp3XaA3NFjlVmQ=s88-c-k-c0x00ffffff-no-rj",
    title:
      "Stokes Heroics And Kohli Century! | England v India HIGHLIGHTS - Edgbaston 2018 | Full Test Recap",
    channel: "England & Wales Cricket Board",
    views: 0,
    date: "1 year ago",
  },
  {
    _id: "O89TmUOZTkc",
    thumbnail: "https://img.youtube.com/vi/O89TmUOZTkc/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnhIUsTIaY4PqAWi91anZTcbSdALv2Ptmz25ibIIpg=s88-c-k-c0x00ffffff-no-rj",
    title: "Chelsea beat Manchester City to win the Champions League",
    channel: "Sky Sports News",
    views: 0,
    date: "1 day ago",
  },
  {
    _id: "5pJJ-TAv14o",
    thumbnail: "https://img.youtube.com/vi/5pJJ-TAv14o/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnhIUsTIaY4PqAWi91anZTcbSdALv2Ptmz25ibIIpg=s88-c-k-c0x00ffffff-no-rj",
    title:
      "Football's Civil War - A Sky Sports News special on the European Super League",
    channel: "Sky Sports News",
    views: 0,
    date: "1 month ago",
  },
  {
    _id: "AjUtWi9idFs",
    thumbnail: "https://img.youtube.com/vi/AjUtWi9idFs/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnjROiS-_8LDkU7BiIE9j3zKaSE7goPKhahDo_4Z=s88-c-k-c0x00ffffff-no-rj",
    title:
      "Mini-Documentary :The Rise & Fall Of The European Super League | The E.S.L. Explained |",
    channel: "Football Made Simple",
    views: 0,
    date: "1 month ago",
  },
  {
    _id: "t4mQUbwx9Q0",
    thumbnail: "https://img.youtube.com/vi/t4mQUbwx9Q0/0.jpg",
    image:
      "https://yt3.ggpht.com/ytc/AAUvwnjROiS-_8LDkU7BiIE9j3zKaSE7goPKhahDo_4Z=s88-c-k-c0x00ffffff-no-rj",
    title:
      "Tactical Analysis : Chelsea 1 - 0 Manchester City | How Tuchel Secured The Champions League |",
    channel: "Football Made Simple",
    views: 0,
    date: "1 day ago",
  },
];

const user = [
  {
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@gmail.com",
    password: "Admin1!1",
  },
];

module.exports = { videos, user };
