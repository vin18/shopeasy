const products = [
  {
    name: 'Bernie Gledhill',
    category: 'chair',
    image:
      'https://res-5.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/f/d/fd1_lngchr_bh_frontlow-field-lounge-chair-tait-blush.jpg',
    price: 700,
    brand: 'Godrej',
    averageRating: 4.5,
    numOfReviews: 10,
    countInStock: 20,
    description:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.',
  },
  {
    name: 'Gwendolen Bickerstaffe',
    category: 'chair',
    image:
      'https://res-3.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/d/s/ds1_lngchr_ca-deep-thoughts-lounge-chair-camel-leather.jpg',
    brand: 'Godrej',
    price: 800,
    averageRating: 4.2,
    numOfReviews: 10,
    countInStock: 20,
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.',
  },
  {
    name: 'Addy Alldre',
    category: 'sofa',
    image:
      'https://res-3.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/c/l/cl1_secktc_cl_view1-cleon-small-sectional-tait-charcoal.jpg',
    price: 1200,
    brand: 'Durian',
    averageRating: 4.5,
    numOfReviews: 10,
    countInStock: 20,
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.',
  },
  {
    name: 'Cristian Gilbanks',
    category: 'sofa',
    image:
      'https://res-4.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/o/n/on1_sleepr_rd_one-night-stand-craig-red.2x.jpg',
    price: 1500,
    brand: 'Durian',
    averageRating: 4.5,
    numOfReviews: 10,
    countInStock: 20,
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
  },

  {
    name: 'Kathye Haith',
    category: 'lamp',
    image:
      'https://res-3.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/r/o/rook_modern_table_lamp.jpg',
    brand: 'Godrej',
    price: 700,
    averageRating: 4.2,
    numOfReviews: 10,
    countInStock: 20,
    description:
      'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.',
  },
  {
    name: 'Armin Basilio',
    category: 'sofa',
    image:
      'https://res-3.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/n/y/ny1_narmsf_ln_frontlow-9-yard-armless-sofa-sunbrella-linen.jpg',
    price: 900,
    brand: 'Durian',
    averageRating: 4.5,
    numOfReviews: 10,
    countInStock: 20,
    description:
      'Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.',
  },
  {
    name: 'Kirstyn Espadate',
    category: 'pillow',
    image:
      'https://res-5.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/d/k/dk1_lmbrpl_og_front.jpg',
    price: 500,
    brand: 'Durian',
    averageRating: 4.5,
    numOfReviews: 10,
    countInStock: 20,
    description:
      'Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
  },
  // {
  //   name: 'Rourke Greet',
  //   category: 'sofa',
  //   image:
  //     'https://res-5.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/n/s/ns1_lnchbk_dk_new-standard-lounge-chair-nixon-dusk-black.jpg',
  //   price: 450,
  //   brand: 'Durian',
  //   averageRating: 4.5,
  //   numOfReviews: 10,
  //   countInStock: 20,
  //   description:
  //     'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
  // },
  {
    name: 'Micheline Charlson',
    category: 'pillow',
    image:
      'https://res-1.cloudinary.com/dwpujv6in/image/upload/c_pad,dpr_2.0,f_auto,h_930,q_auto,w_930/v1/media/catalog/product/d/k/dk1_sqrplw_mg_front.jpg',
    price: 650,
    brand: 'Durian',
    averageRating: 4.5,
    numOfReviews: 10,
    countInStock: 20,
    description:
      'Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.',
  },
];

export default products;
