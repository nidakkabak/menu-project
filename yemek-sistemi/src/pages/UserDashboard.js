import React from "react";
import MenuViewer from "../components/MenuViewer";

export default function UserDashboard() {
 const monthlyMenu = [
  {
    date: "07 Temmuz 2025",
    day: "Pazartesi",
    meals: [
      "Fırında Izgara Tavuk Kalça",
      "Nohutlu Pirinç Pilavı",
      "Havuç Tarator",
    ],
  },
  {
    date: "08 Temmuz 2025",
    day: "Salı",
    meals: [
      "Biber Dolması",
      "Semizotlu Yaz Salatası",
      "Yoğurt",
    ],
  },
  {
    date: "09 Temmuz 2025",
    day: "Çarşamba",
    meals: [
      "Köfteli Ispanak",
      "Patates Püresi",
      "Yaz Salatası",
    ],
  },
  {
    date: "10 Temmuz 2025",
    day: "Perşembe",
    meals: [
      "Fırın Makarnası",
      "Taze Pancarlı Salata",
      "Köz Patlıcan Meze",
    ],
  },
  {
    date: "11 Temmuz 2025",
    day: "Cuma",
    meals: [
      "Domates Soslu Tavuk Köfte",
      "Şehriyeli Bulgur Pilavı",
      "Mevsim Salata",
    ],
  },
  {
    date: "14 Temmuz 2025",
    day: "Pazartesi",
    meals: [
      "Tavuk Sote",
      "Mücendra Pilavı",
      "Yoğurt",
    ],
  },
  {
    date: "15 Temmuz 2025",
    day: "Salı",
    meals: [
      "Etli Yaz Türlüsü",
      "Mısırlı Pirinç Pilavı",
      "Mevsim Salata",
    ],
  },
  {
    date: "16 Temmuz 2025",
    day: "Çarşamba",
    meals: [
      "Tavuk Kebap Köfte",
      "Izgara Patates",
      "Otlu Sebze Haşlama",
    ],
  },
  {
    date: "17 Temmuz 2025",
    day: "Perşembe",
    meals: [
      "Taze Fasulye",
      "Tavuklu Pirinç Pilavı",
      "Yoğurt",
    ],
  },
  {
    date: "18 Temmuz 2025",
    day: "Cuma",
    meals: [
      "Magarına Bulli (Tavuk Kalça)",
      "Beyaz Peynirli Zeytinli Salata",
    ],
  },
  {
    date: "21 Temmuz 2025",
    day: "Pazartesi",
    meals: [
      "Kıbrıs Köftesi ve Patates",
      "Kuru Börülce Salatası",
      "Yoğurt",
    ],
  },
  {
    date: "22 Temmuz 2025",
    day: "Salı",
    meals: [
      "Et Kebap Köfte",
      "Domatesli Bulgur Pilavı",
      "Yoğurt",
    ],
  },
  {
    date: "23 Temmuz 2025",
    day: "Çarşamba",
    meals: [
      "Tavuklu Bezelye",
      "Pirinç Pilavı",
      "Roka Salatası",
    ],
  },
  {
    date: "24 Temmuz 2025",
    day: "Perşembe",
    meals: [
      "Mantarlı Tavuk Sote",
      "Hellimli Makarna",
      "Izgara Sebze",
    ],
  },
  {
    date: "25 Temmuz 2025",
    day: "Cuma",
    meals: [
      "Patates Musakka",
      "Garnitürlü Pirinç Pilavı",
      "Cacık",
    ],
  },
  {
    date: "28 Temmuz 2025",
    day: "Pazartesi",
    meals: [
      "Fırında Tavuk Patates Kebabı",
      "Bulgur Pilavı",
      "Taze Kişnişli Salata",
    ],
  },
  {
    date: "29 Temmuz 2025",
    day: "Salı",
    meals: [
      "Domates Soslu Tavuk Köfte",
      "Hellimli Makarna",
      "Buharda Karışık Sebze",
    ],
  },
  {
    date: "30 Temmuz 2025",
    day: "Çarşamba",
    meals: [
      "Tavuklu Sebzeli Makarna",
      "Izgara Sebze ve Patates",
      "Cacık",
    ],
  },
  {
    date: "31 Temmuz 2025",
    day: "Perşembe",
    meals: [
      "Etli Kuru Fasulye",
      "Pirinç Pilavı",
      "Söğüş Sebze Turşu",
    ],
  },
  {
    date: "01 Ağustos 2025",
    day: "Cuma",
    meals: [
      "Tavuklu Patlıcan Yemeği",
      "Bulgur Pilavı",
      "Yoğurt",
    ],
  },
];

  const alternatives = {
  Sandwich: [
    {
      name: "Chicken Avocado Sandwich",
      bread: "Tortilla",
      ingredients: "Avocado ezmesi, izgara tavuk, marul, domates, ballı hardal",
    },
    {
      name: "Turkey and Cheese Sandwich",
      bread: "Kepekli Dilimli",
      ingredients: "Edam peyniri, marul, domates, salatalık, hindi fume, labne",
    },
    {
      name: "Chicken Caesar Sandwich",
      bread: "Normal Dilimli",
      ingredients: "Izgara tavuk, kırmızı chedar peyniri, marul, Caesar sos",
    },
    {
      name: "Classic Sandwich",
      bread: "Tortilla",
      ingredients: "Haşlanmış tavuk göğsü, hellim, peynir, domates, salatalık, zeytin ezmesi, mısır",
    },
    {
      name: "Felafel Sandwich",
      bread: "Tortilla",
      ingredients: "Felafel, tahin sos, mor lahana turşusu, marul",
    },
    {
      name: "Feta Avocado Sandwich",
      bread: "Tortilla",
      ingredients: "Avocado ezmesi, beyaz peynir, kuru domates, ızgara mantar, roka, zeytinyağı, kekik",
    },
    {
      name: "Roasted Red Bell Pepper and Feta Sandwich",
      bread: "Beyaz Dilimli",
      ingredients: "Közlenmiş Kapya Biber, roka, beyaz peynir, labne, mısır, zeytinyağı, kekik",
    },
    {
      name: "Chicken Pesto Sandwich",
      bread: "Tortilla",
      ingredients: "Izgara tavuk, pesto sos, kuru domates, edam peyniri, roka",
    },
    {
      name: "Pesto and Cheese",
      bread: "Normal Dilimli",
      ingredients: "Peynir, kuru domates, pesto sos, labne, roka, zeytinyağı, kekik",
    },
    {
      name: "Creamy Spinach and Chicken",
      bread: "Normal Dilimli",
      ingredients: "Izgara tavuk, kremalı ıspanak, kuru domates, peynir",
    },
    {
      name: "Dana Jambon Sandwich",
      bread: "Normal Dilimli",
      ingredients: "Hellim, dana jambon, domates, salatalık, marul",
    },
    {
      name: "Beyaz Peynirli Sandwich",
      bread: "Kepekli Dilimli",
      ingredients: "Maydanozlu beyaz peynir, labne, domates, salatalık",
    },
    {
      name: "Honey Mustard and Turkey",
      bread: "Normal Dilimli",
      ingredients: "Hindi fume, ballı hardal, peynir, domates, marul",
    },
    {
      name: "Club Sandwich",
      bread: "Kepekli Dilimli",
      ingredients: "Dana jambon, hindi fume, peynir, marul, domates, kornişon turşusu, mayonez",
    },
    {
      name: "Crispy Chicken Sandwich",
      bread: "Tortilla",
      ingredients: "Çıtır tavuk, coleslaw, marul",
    },
  ],
  Salata: [
    {
      name: "Chicken Salad",
      bread: "-",
      ingredients: "Izgara tavuk, marul, roka, havuç, kapya biber, domates, salatalık",
      sauce: "Nar ekşisi, limon, zeytinyağı",
    },
    {
      name: "Canteen Salad",
      bread: "-",
      ingredients: "Izgara tavuk, marul, roka, domates, beyaz peynir, kapari turşusu",
      sauce: "Balzamik sirke ve hardallı canteen sos",
    },
    {
      name: "Felafel Salad",
      bread: "-",
      ingredients: "Marul, roka, domates, havuç, mor lahana turşusu, tahin sos",
      sauce: "Limon, zeytinyağı",
    },
    {
      name: "Feta Salad",
      bread: "-",
      ingredients: "Marul, roka, salatalık, domates, yeşil zeytin, siyah zeytin, beyaz peynir",
      sauce: "Nar ekşisi, limon",
    },
    {
      name: "Pesto Soslu Soğuk Makarna Salatası",
      bread: "-",
      ingredients: "Tam tahıllı penne makarna, ızgara tavuk, ızgara mantar, pesto sos, kuru domates, roka, parmesan",
    },
  ],
};


  return <MenuViewer initialMenu={monthlyMenu} alternatives={alternatives} />;
}
