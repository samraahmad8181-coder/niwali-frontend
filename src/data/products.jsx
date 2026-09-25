const products = [
    {
        id: 1,
        title: "Collagen Peptides",
        description:
            "Niwali Collagen Peptides | Beauty & Wellness Support | Premium Formula",
        price: "49.99",
        originalPrice: "44.99",
        sale: true,
        images: [
            "https://niwali.com/cdn/shop/files/24_6270a204-be31-4899-94e3-60f0b63b7b4c.jpg?v=1769494328&width=990",
            "https://niwali.com/cdn/shop/files/s-l960_6.webp?v=1769494330&width=1100",
            "https://niwali.com/cdn/shop/files/s-l960_7.webp?v=1769494332&width=1100",
            "https://niwali.com/cdn/shop/files/s-l960_8.webp?v=1769494334&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Skin & Beauty Support",
                    text: "Supports healthy-looking skin and overall beauty wellness."
                },
                {
                    title: "Hair & Nail Support",
                    text: "Provides nutritional support for healthy hair and strong-looking nails."
                },
                {
                    title: "Collagen Support",
                    text: "Helps complement your daily collagen intake as part of a balanced wellness routine."
                },
                {
                    title: "Daily Wellness",
                    text: "A convenient formula designed to complement your everyday wellness routine."
                }
            ]
        }
    },

    {
        id: 2,
        title: "Magnesium",
        description:
            "Niwali Magnesium Capsules | Daily Mineral Support | 60 Count",
        price: "24.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/StemCell.jpg?v=1769494346&width=1100",
            "https://niwali.com/cdn/shop/files/StemCell2.jpg?v=1769494348&width=1100",
            "https://niwali.com/cdn/shop/files/StemCell4.jpg?v=1769494351&width=1100"
        ],


        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Muscle Support",
                    text: "Supports normal muscle function and everyday physical wellness."
                },
                {
                    title: "Nervous System Support",
                    text: "Provides magnesium to support normal nervous system function."
                },
                {
                    title: "Energy Support",
                    text: "Helps support normal energy metabolism and daily nutritional needs."
                },
                {
                    title: "Mineral Support",
                    text: "Provides a convenient source of magnesium for your daily wellness routine."
                }
            ]
        }
    },

    {
        id: 3,
        title: "Probiotics",
        description:
            "Niwali Probiotic Capsules | Digestive & Gut Wellness Support",
        price: "31.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/13.jpg?v=1769494287&width=1100",
            "https://niwali.com/cdn/shop/files/2.AlphaCutHD.jpg?v=1769494290&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaCutHD-Benefits.jpg?v=1769494293&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaCutHD-Features.jpg?v=1769494295&width=1100"
        ],


        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Digestive Support",
                    text: "Supports healthy digestion and everyday digestive wellness."
                },
                {
                    title: "Gut Wellness",
                    text: "Helps support a balanced gut environment as part of a healthy lifestyle."
                },
                {
                    title: "Microbiome Support",
                    text: "Provides beneficial bacteria to complement your daily wellness routine."
                },
                {
                    title: "Daily Probiotic Support",
                    text: "A convenient capsule formula designed for everyday probiotic supplementation."
                }
            ]
        }
    },

    {
        id: 4,
        title: "Vitamin C",
        description:
            "Niwali Vitamin C Capsules | Immune & Antioxidant Support | 60 Count",
        price: "22.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/AminoMuscle.jpg?v=1769149815&width=990",
            "https://niwali.com/cdn/shop/files/Amino_Muscle-Promo.jpg?v=1769149817&width=1100",
            "https://niwali.com/cdn/shop/files/Amino_Muscle-Features.jpg?v=1769149819&width=1100",
            "https://niwali.com/cdn/shop/files/Amino_Muscle-Benefits.jpg?v=1769149823&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Immune Support",
                    text: "Supports normal immune system function and everyday wellness."
                },
                {
                    title: "Antioxidant Support",
                    text: "Provides antioxidant support to help protect cells from oxidative stress."
                },
                {
                    title: "Collagen Support",
                    text: "Supports normal collagen formation for skin and connective tissue wellness."
                },
                {
                    title: "Daily Wellness",
                    text: "Provides a convenient source of vitamin C for your daily nutritional routine."
                }
            ]
        }
    },

    {
        id: 5,
        title: "Biotin",
        description:
            "Niwali Biotin Capsules | Hair, Skin & Nail Wellness Support",
        price: "29.99",
        originalPrice: "25.99",
        sale: true,
        images: [
            "https://niwali.com/cdn/shop/files/14.jpg?v=1769494299&width=1100",
            "https://niwali.com/cdn/shop/files/12.OrvigoMx.jpg?v=1769494300&width=1100",
            "https://niwali.com/cdn/shop/files/OrvigoMax-Benefits.jpg?v=1769494304&width=1100",
            "https://niwali.com/cdn/shop/files/OrvigoMax-Features.jpg?v=1769494305&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Hair Wellness",
                    text: "Supports the maintenance of healthy-looking hair as part of a balanced diet."
                },
                {
                    title: "Skin Support",
                    text: "Provides nutritional support for maintaining healthy skin."
                },
                {
                    title: "Nail Support",
                    text: "Supports the maintenance of healthy and strong-looking nails."
                },
                {
                    title: "Daily Beauty Wellness",
                    text: "A convenient biotin formula designed to complement your daily beauty and wellness routine."
                }
            ]
        }
    },

    {
        id: 6,
        title: "Omega 3",
        description:
            "Niwali Omega 3 Fish Oil Capsules | Heart & Wellness Support",
        price: "36.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/13.jpg?v=1769494287&width=990",
            "https://niwali.com/cdn/shop/files/2.AlphaCutHD.jpg?v=1769494290&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaCutHD-Benefits.jpg?v=1769494293&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaCutHD-Features.jpg?v=1769494295&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Heart Wellness",
                    text: "Provides omega-3 fatty acids to support cardiovascular wellness."
                },
                {
                    title: "EPA & DHA Support",
                    text: "Provides essential omega-3 fatty acids including EPA and DHA."
                },
                {
                    title: "Brain & Eye Support",
                    text: "DHA contributes to the maintenance of normal brain and vision function."
                },
                {
                    title: "Daily Omega-3 Support",
                    text: "A convenient fish oil capsule designed to complement your daily nutritional routine."
                }
            ]
        }
    },

    {
        id: 7,
        title: "Moringa",
        description:
            "Niwali Moringa Capsules | Organic Herbal Superfood Supplement",
        price: "34.99",
        originalPrice: "28.99",
        sale: true,
        images: [
            "https://niwali.com/cdn/shop/files/12.jpg?v=1769494206&width=990",
            "https://niwali.com/cdn/shop/files/AlphaFuelXT3-Features.jpg?v=1769494209&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaFuelXT-Benefits.jpg?v=1769494212&width=1100",
            "https://niwali.com/cdn/shop/files/3.AlphaFuelXT.jpg?v=1769494283&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Nutritional Support",
                    text: "Provides plant-based nutritional support as part of a balanced lifestyle."
                },
                {
                    title: "Antioxidant Support",
                    text: "Contains naturally occurring plant compounds that provide antioxidant support."
                },
                {
                    title: "Plant-Based Wellness",
                    text: "Made with moringa, a traditional botanical used as part of everyday wellness."
                },
                {
                    title: "Daily Herbal Support",
                    text: "A convenient capsule format for incorporating moringa into your daily routine."
                }
            ]
        }
    },

    {
        id: 8,
        title: "Milk Thistle",
        description:
            "Niwali Milk Thistle Capsules | Herbal Liver & Detox Support",
        price: "30.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/19.jpg?v=1769149893&width=990",
            "https://niwali.com/cdn/shop/files/813jdB4wgsL._AC_SX679.jpg?v=1769149894&width=1100",
            "https://niwali.com/cdn/shop/files/81JaLUSpF4L._AC_SX679.jpg?v=1769494201&width=1100",
            "https://niwali.com/cdn/shop/files/816j21FEopL._AC_SX679.jpg?v=1769494203&width=1100",
            "https://niwali.com/cdn/shop/files/914Z3FVmlkL._AC_SX679.jpg?v=1769494204&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Liver Wellness",
                    text: "Provides herbal nutritional support for maintaining normal liver wellness."
                },
                {
                    title: "Antioxidant Support",
                    text: "Milk thistle provides naturally occurring compounds with antioxidant properties."
                },
                {
                    title: "Herbal Wellness",
                    text: "A traditional botanical supplement designed to complement an everyday wellness routine."
                },
                {
                    title: "Daily Supplementation",
                    text: "Convenient capsules make it easy to include milk thistle in your daily routine."
                }
            ]
        }
    },

    {
        id: 1,
        title: "Collagen Peptides",
        description:
            "Niwali Collagen Peptides | Beauty & Wellness Support | Premium Formula",
        price: "49.99",
        originalPrice: "44.99",
        sale: true,
        images: [
            "https://niwali.com/cdn/shop/files/24_6270a204-be31-4899-94e3-60f0b63b7b4c.jpg?v=1769494328&width=990",
            "https://niwali.com/cdn/shop/files/s-l960_6.webp?v=1769494330&width=1100",
            "https://niwali.com/cdn/shop/files/s-l960_7.webp?v=1769494332&width=1100",
            "https://niwali.com/cdn/shop/files/s-l960_8.webp?v=1769494334&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Skin & Beauty Support",
                    text: "Supports healthy-looking skin and overall beauty wellness."
                },
                {
                    title: "Hair & Nail Support",
                    text: "Provides nutritional support for healthy hair and strong-looking nails."
                },
                {
                    title: "Collagen Support",
                    text: "Helps complement your daily collagen intake as part of a balanced wellness routine."
                },
                {
                    title: "Daily Wellness",
                    text: "A convenient formula designed to complement your everyday wellness routine."
                }
            ]
        }
    },

    {
        id: 2,
        title: "Magnesium",
        description:
            "Niwali Magnesium Capsules | Daily Mineral Support | 60 Count",
        price: "24.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/StemCell.jpg?v=1769494346&width=1100",
            "https://niwali.com/cdn/shop/files/StemCell2.jpg?v=1769494348&width=1100",
            "https://niwali.com/cdn/shop/files/StemCell4.jpg?v=1769494351&width=1100"
        ],


        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Muscle Support",
                    text: "Supports normal muscle function and everyday physical wellness."
                },
                {
                    title: "Nervous System Support",
                    text: "Provides magnesium to support normal nervous system function."
                },
                {
                    title: "Energy Support",
                    text: "Helps support normal energy metabolism and daily nutritional needs."
                },
                {
                    title: "Mineral Support",
                    text: "Provides a convenient source of magnesium for your daily wellness routine."
                }
            ]
        }
    },

    {
        id: 3,
        title: "Probiotics",
        description:
            "Niwali Probiotic Capsules | Digestive & Gut Wellness Support",
        price: "31.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/13.jpg?v=1769494287&width=1100",
            "https://niwali.com/cdn/shop/files/2.AlphaCutHD.jpg?v=1769494290&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaCutHD-Benefits.jpg?v=1769494293&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaCutHD-Features.jpg?v=1769494295&width=1100"
        ],


        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Digestive Support",
                    text: "Supports healthy digestion and everyday digestive wellness."
                },
                {
                    title: "Gut Wellness",
                    text: "Helps support a balanced gut environment as part of a healthy lifestyle."
                },
                {
                    title: "Microbiome Support",
                    text: "Provides beneficial bacteria to complement your daily wellness routine."
                },
                {
                    title: "Daily Probiotic Support",
                    text: "A convenient capsule formula designed for everyday probiotic supplementation."
                }
            ]
        }
    },

    {
        id: 4,
        title: "Vitamin C",
        description:
            "Niwali Vitamin C Capsules | Immune & Antioxidant Support | 60 Count",
        price: "22.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/AminoMuscle.jpg?v=1769149815&width=990",
            "https://niwali.com/cdn/shop/files/Amino_Muscle-Promo.jpg?v=1769149817&width=1100",
            "https://niwali.com/cdn/shop/files/Amino_Muscle-Features.jpg?v=1769149819&width=1100",
            "https://niwali.com/cdn/shop/files/Amino_Muscle-Benefits.jpg?v=1769149823&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Immune Support",
                    text: "Supports normal immune system function and everyday wellness."
                },
                {
                    title: "Antioxidant Support",
                    text: "Provides antioxidant support to help protect cells from oxidative stress."
                },
                {
                    title: "Collagen Support",
                    text: "Supports normal collagen formation for skin and connective tissue wellness."
                },
                {
                    title: "Daily Wellness",
                    text: "Provides a convenient source of vitamin C for your daily nutritional routine."
                }
            ]
        }
    },

    {
        id: 5,
        title: "Biotin",
        description:
            "Niwali Biotin Capsules | Hair, Skin & Nail Wellness Support",
        price: "29.99",
        originalPrice: "25.99",
        sale: true,
        images: [
            "https://niwali.com/cdn/shop/files/14.jpg?v=1769494299&width=1100",
            "https://niwali.com/cdn/shop/files/12.OrvigoMx.jpg?v=1769494300&width=1100",
            "https://niwali.com/cdn/shop/files/OrvigoMax-Benefits.jpg?v=1769494304&width=1100",
            "https://niwali.com/cdn/shop/files/OrvigoMax-Features.jpg?v=1769494305&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Hair Wellness",
                    text: "Supports the maintenance of healthy-looking hair as part of a balanced diet."
                },
                {
                    title: "Skin Support",
                    text: "Provides nutritional support for maintaining healthy skin."
                },
                {
                    title: "Nail Support",
                    text: "Supports the maintenance of healthy and strong-looking nails."
                },
                {
                    title: "Daily Beauty Wellness",
                    text: "A convenient biotin formula designed to complement your daily beauty and wellness routine."
                }
            ]
        }
    },

    {
        id: 6,
        title: "Omega 3",
        description:
            "Niwali Omega 3 Fish Oil Capsules | Heart & Wellness Support",
        price: "36.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/13.jpg?v=1769494287&width=990",
            "https://niwali.com/cdn/shop/files/2.AlphaCutHD.jpg?v=1769494290&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaCutHD-Benefits.jpg?v=1769494293&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaCutHD-Features.jpg?v=1769494295&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Heart Wellness",
                    text: "Provides omega-3 fatty acids to support cardiovascular wellness."
                },
                {
                    title: "EPA & DHA Support",
                    text: "Provides essential omega-3 fatty acids including EPA and DHA."
                },
                {
                    title: "Brain & Eye Support",
                    text: "DHA contributes to the maintenance of normal brain and vision function."
                },
                {
                    title: "Daily Omega-3 Support",
                    text: "A convenient fish oil capsule designed to complement your daily nutritional routine."
                }
            ]
        }
    },

    {
        id: 7,
        title: "Moringa",
        description:
            "Niwali Moringa Capsules | Organic Herbal Superfood Supplement",
        price: "34.99",
        originalPrice: "28.99",
        sale: true,
        images: [
            "https://niwali.com/cdn/shop/files/12.jpg?v=1769494206&width=990",
            "https://niwali.com/cdn/shop/files/AlphaFuelXT3-Features.jpg?v=1769494209&width=1100",
            "https://niwali.com/cdn/shop/files/AlphaFuelXT-Benefits.jpg?v=1769494212&width=1100",
            "https://niwali.com/cdn/shop/files/3.AlphaFuelXT.jpg?v=1769494283&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Nutritional Support",
                    text: "Provides plant-based nutritional support as part of a balanced lifestyle."
                },
                {
                    title: "Antioxidant Support",
                    text: "Contains naturally occurring plant compounds that provide antioxidant support."
                },
                {
                    title: "Plant-Based Wellness",
                    text: "Made with moringa, a traditional botanical used as part of everyday wellness."
                },
                {
                    title: "Daily Herbal Support",
                    text: "A convenient capsule format for incorporating moringa into your daily routine."
                }
            ]
        }
    },

    {
        id: 8,
        title: "Milk Thistle",
        description:
            "Niwali Milk Thistle Capsules | Herbal Liver & Detox Support",
        price: "30.99",
        sale: false,
        images: [
            "https://niwali.com/cdn/shop/files/19.jpg?v=1769149893&width=990",
            "https://niwali.com/cdn/shop/files/813jdB4wgsL._AC_SX679.jpg?v=1769149894&width=1100",
            "https://niwali.com/cdn/shop/files/81JaLUSpF4L._AC_SX679.jpg?v=1769494201&width=1100",
            "https://niwali.com/cdn/shop/files/816j21FEopL._AC_SX679.jpg?v=1769494203&width=1100",
            "https://niwali.com/cdn/shop/files/914Z3FVmlkL._AC_SX679.jpg?v=1769494204&width=1100"
        ],

        productBenefits: {
            title: "Major Product Benefits",
            items: [
                {
                    title: "Liver Wellness",
                    text: "Provides herbal nutritional support for maintaining normal liver wellness."
                },
                {
                    title: "Antioxidant Support",
                    text: "Milk thistle provides naturally occurring compounds with antioxidant properties."
                },
                {
                    title: "Herbal Wellness",
                    text: "A traditional botanical supplement designed to complement an everyday wellness routine."
                },
                {
                    title: "Daily Supplementation",
                    text: "Convenient capsules make it easy to include milk thistle in your daily routine."
                }
            ]
        }
    },
];

export default products;