## API

`POST /v1/auth/sign_up`
  * society:
    * email: `string` e.g. "dvdhsu@gmail.com"
    * password: `string` e.g. "asdf"
    * password_confirmation: `string` e.g. "asdf"
    * name: `string` e.g. "Magdalen Film Society"
    * nickname: `string` e.g. "mfs" (optional)

    ``` {
      "data": {
        "society": {
          "id": 1,
            "name": "Magdalen Film Society",
            "nickname": "mfs",
            "auth_token": "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",
            "email": "dvdhsu@gmail.com"
        },
          "items": []
      }
    } ```

`POST /v1/auth/login`
  * email: `string` e.g. "dvdhsu@gmail.com"
  * password: `string` e.g. "asdf"

  ```{
    "data": {
      "society": {
        "id": 1,
          "name": "Magdalen Film Society",
          "nickname": "mfs",
          "auth_token":
            "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",
          "email": "dvdhsu@gmail.com"
      },
        "items": []
    }
  }```

`POST /v1/auth/login_with_token`
    * email: `string` e.g. "dvdhsu@gmail.com"
    * auth_token: `string` e.g. "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",

    ```{
      "data": {
        "society": {
          "id": 1,
            "name": "Magdalen Film Society",
            "nickname": "mfs",
            "auth_token":
              "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",
            "email": "dvdhsu@gmail.com"
        },
          "items": []
      }
    }```


`POST /v1/society/`
  * nickname: `string` e.g. "mfs"
  * email: `string` e.g. "dvdhsu@gmail.com"
  * auth_token: `string` e.g. "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",
  * society:
    * email: `string` e.g. "dvdhsu@gmail.com"
    * password: `string` e.g. "asdf"
    * password_confirmation: `string` e.g. "asdf"
    * name: `string` e.g. "Magdalen Film Club"
    * nickname: `string` e.g. "mfs" (optional)

    ```{
      "data": {
        "society": {
          "id": 1,
          "name": "Magdalen Film Club",
          "nickname": "mfs",
          "auth_token": "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",
          "email": "dvdhsu@gmail.com"
        },
        "items": []
      }
    }```

`GET /v1/society/`
  * nickname: `string` e.g. "mfs"
  * email: `string` e.g. "dvdhsu@gmail.com"
  * auth_token: `string e.g. "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae"

  ``` {
    "data": {
      "society": {
        "id": 1,
          "name": "Magdalen Film Club",
          "nickname": "mfs",
          "auth_token":
            "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",
          "email": "dvdhsu@gmail.com"
      },
        "items": []
    }
  }```

`POST /v1/items/`
  * email: `string` e.g. "dvdhsu@gmail.com"
  * auth_token: `string` e.g. "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",
  * item:
    * name: `string` e.g. "Formal Ticket"
    * price: `integer` e.g. 10
    * capacity: `integer` e.g. 100

    ```{
      "data": {
        "item": {
          "id": 1,
          "name": "Formal Ticket",
          "price": "10",
          "capacity": 100,
          "society_id": 1,
          "created_at":
            "2016-01-23T18:04:20.674Z",
          "updated_at":
            "2016-01-23T18:04:20.674Z"
        }
      }
    }```

`POST /v1/items/:id`
  * email: `string` e.g. "dvdhsu@gmail.com"
  * auth_token: `string` e.g. "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",
  * item:
    * name: `string` e.g. "Formal Ticket"
    * price: `integer` e.g. 42
    * capacity: `integer` e.g. 100

    ```{
      "data": {
        "item": {
          "society_id": 1,
          "name": "Formal Ticket",
          "price": "42",
          "capacity": 100,
          "id": 1,
          "created_at": "2016-01-23T18:04:20.674Z",
          "updated_at": "2016-01-23T18:11:05.989Z"
        }
      }
    }```

`DELETE /v1/items/:id`
  * email: `string` e.g. "dvdhsu@gmail.com"
  * auth_token: `string` e.g. "3200e94ef5317fc12a743c4e15df07524ab4c03c55008ba65a35d0e351415cf4ed33ea175acbafefb0ef5272d7d1972acec6ceb63623625c22619a128284a23e1d9cd70fc4dbcb9fca5377da07a220aa3c9a3561301f5313fadbd4172581fb3c676b3dfe02f5bf3acaf0ed2e56b4351460c5888b5b06a7797e4c7b2f99cb1678a41738fadbb2c54d95b5a77f8c2b27a657fe907cceab39fc6de011e5adc9483b2f17e478fce2f577c2e1ef3fd855488c3f4eee2f4c27ef4f639344230c5cf8b336e747905b8e4bce8fff91581620a744a359caba9c0093a78f7cffa2e4a8c466c195952afa29e27cde9cd1c5bed54a457e6e9f887b9a538272f0536d67bd60ae",

  ```{
    "status": "success"
  }```
