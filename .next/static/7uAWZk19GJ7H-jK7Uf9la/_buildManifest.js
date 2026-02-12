self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/rooms-in-bilaspur",
        "destination": "/listing?category=Room&district=Bilaspur"
      },
      {
        "source": "/rooms-in-raipur",
        "destination": "/listing?category=Room&district=Raipur"
      },
      {
        "source": "/pg-in-bilaspur",
        "destination": "/listing?category=PG&district=Bilaspur"
      },
      {
        "source": "/pg-in-raipur",
        "destination": "/listing?category=PG&district=Raipur"
      },
      {
        "source": "/houses-in-bilaspur",
        "destination": "/listing?category=House&district=Bilaspur"
      },
      {
        "source": "/houses-in-raipur",
        "destination": "/listing?category=House&district=Raipur"
      },
      {
        "source": "/plots-in-bilaspur",
        "destination": "/listing?category=Plot&district=Bilaspur"
      },
      {
        "source": "/plots-in-raipur",
        "destination": "/listing?category=Plot&district=Raipur"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()