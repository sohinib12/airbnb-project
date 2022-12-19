'use strict';

// const { mapFinderOptions } = require('sequelize/types/utils');

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages"
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/852f2d4d-6786-47b5-a3ca-ff7f21bcac2d.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/7fc0a920-2915-4a1d-876b-bbe248bee8b9.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/42410ac8-5dce-4dba-a777-0100ce3afb19.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/f9d4fa41-34d8-4e8d-b63c-10813ae7d0e5.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/76508673-684c-4cf5-84fe-76ce7eefbda0.jpg',
        preview: false
      },

      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/1f6c495e-b877-4a48-9f2c-d8012f640166.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/110ce1ab-697a-4efb-adf2-00e048496bbe',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/cd917d61-c934-4431-afff-f937d69bc550',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/a89dc092-9db5-4b9c-be4e-9372c9a9762f',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/76f55ae4-bb98-4d7f-b752-42b8eb55c5b3',
        preview: false
      },

      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/2e5ce6c9-4935-49ce-891e-e6f7251a8590.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/8cd65997-d77d-40f0-a41c-18ef2559d881.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/437e2203-d8da-4dc6-91ce-887ab6b471ca.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/18da2fe5-817c-4f0e-87a8-ff7a4d23e763.jpeg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/fa2ee3c1-8435-438c-a7a6-2277d9eb3362.jpeg',
        preview: false
      },

      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/e41b770f-f42f-4a61-ad63-c492b3e66a84.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/f7fb2bb9-ecba-4e63-a11a-28cc6cf2fe88.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/1dec8f5d-b51a-4289-a865-d214ee52772e.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/158ca8ca-b64d-43c8-82d8-4e6ee5eb2e7c.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47026814/original/511f0893-985a-4d38-8291-c0a9ed9c6602.jpeg',
        preview: false
      },

      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/fb3e7dbf-0720-4987-af87-c68c0c64a264.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/c2af232a-3423-47fa-93b3-5eeda430fe0d.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/f720bfb9-2d58-42c4-bb9d-ac9d7b39f6ec.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/7b5052f9-7f19-4013-b8a2-79423946f6c8.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/4a0e4d1e-a4da-41f4-8ea4-795df8c4f968.jpg',
        preview: false
      },

      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/b4db5900-b90e-4cc3-b12b-6d17953d0079.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/a0fba8a3-2ccb-4d74-83a6-734973b7215b.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/64986466-734d-4c39-ab52-69f6b9c1059b.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/76f43fbe-2524-4469-8eb3-ab12ac0738e0.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/821c48da-954f-47ed-b751-2e3e63114c62.jpg',
        preview: false
      },

      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/181dc5de-c370-4790-acb6-d3ef7c2031f0.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/e7821e5d-acb3-4331-abc8-8432903b9ec4.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/a4c55b70-22a6-4d07-8ede-9cd3859ca8fc.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/51e2dcc7-90d6-40ee-bd3e-b86c36866dd9.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/6716b1f4-d864-4f1a-90df-3f4c25bcf19c.jpg',
        preview: false
      },

      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/14e75ee2-90a7-4770-bf15-c9d6449fe481.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/92ad6a1f-c284-403b-ae90-cb31c39e7eda.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/9610cfb6-79bf-45c2-8a8e-08fa243df928.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/9a4e7f9c-f643-4e83-aa88-cba0f803107e.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-30006984/original/3a699c61-9fde-4f5a-8aa3-d9275b9c055a.jpeg',
        preview: false
      },

      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/4ab437b3-71a6-40c8-9514-f327f9cbf1fa.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/96646403-d16f-4bd6-8b87-b98d6e8f125f.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/01d1aeb0-0419-4504-a8cc-1ba904241d6a.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/378755c4-210d-4dad-a654-36bccae9b778.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/c2fc79c8-c78c-4f91-8106-e7e1adbacf30.jpg',
        preview: false
      },

      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/1e99fc05-dfeb-474e-85c6-fed7e6633d04.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/37fb1d14-b401-45fd-a57b-06b0da5d7d19.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/66c6dbaf-9152-4bd2-844e-499d41591754.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-44106940/original/66a4178c-8c97-4a18-80fb-1da7842a2f9a.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/101a6d92-458d-49e2-bc32-79ef6a82c1dd.jpg',
        preview: false
      },

      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/625ef14e-78e3-483e-b9a7-f3733dbcd865.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/d52fe469-93da-4210-b785-73e99ec5335c.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-10814829/original/ec07ffb8-31f8-4983-9ed7-6708449961d7.jpeg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/18bd46b1-42fe-4ed0-929d-14ee79504c48.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/9a097547-60ec-4193-9441-915380b94e84.jpg',
        preview: false
      },

      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-36178324/original/66b63b66-868b-42c7-a490-6fbc76598818.jpeg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/16c869dd-88bb-4c1a-a6ab-feb8083fd914.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/d0513fda-e1cb-403d-88da-c4e2d6f7fc80.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/08c1284c-4e48-4b6f-85e0-a122289d1198.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/921ca72b-5cad-487c-a9a6-9d89d3695139.jpg',
        preview: false
      },

      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/43f6a8d7-231d-42fd-a203-b3928691ac54.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/3ca666c3-1546-45b2-a04a-ecb1d1381869.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/23c04a60-c4d4-42be-b9eb-706280fb9f30.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/5b2e885a-90be-4210-9ec3-6df18fa30be4.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/3087ad19-d0aa-4889-a368-b2cbc435db36.jpg',
        preview: false
      },

      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/a888896e-a2da-4a36-b605-b87946367ad4.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/96391c36-4b7c-43cf-9485-28b6f7ef675f.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/dbb51fd7-4d7d-4974-ad35-603540f8f051.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/c5937125-4efe-4f18-ae15-c5d8b39c07e9.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/90679b14-a8b0-4422-84bb-803c4d395078.jpg',
        preview: false
      },

      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53739440/original/2365201b-3c78-4b75-a7d9-2e01e3998fcc',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53739440/original/44ab6424-557f-4565-b8cb-920805151937',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53739440/original/bce6990c-a6b0-4321-84b7-f772223fb4c2',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53739440/original/cbe32cfe-b69a-4d20-9177-54a079810366',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53739440/original/5179fe24-2ea5-4271-a9bd-185f6560661b',
        preview: false
      },


    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options);
  }
};
