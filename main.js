import * as THREE from "https://cdn.skypack.dev/three@0.123.0";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://cdn.skypack.dev/three@0.123.0/examples/jsm/postprocessing/ShaderPass.js";

const panoramas = [
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-1.jpg?v=1731402007481",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-2.jpg?v=1731439302339",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-3.jpg?v=1731439302505",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-4.jpg?v=1731439303023",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-5.jpg?v=1731439303982",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-6.jpg?v=1731439307229",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-7.jpg?v=1731439307855",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-8.jpg?v=1731439310066",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-9.jpg?v=1731439311834",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-10.jpg?v=1731439313841",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-11.jpg?v=1731439316565",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-12.jpg?v=1731439317689",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-13.jpg?v=1731439319437",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-14.jpg?v=1731439321477",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-15.jpg?v=1731439323282",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-16.jpg?v=1731439325293",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-17.jpg?v=1731439326942",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-18.jpg?v=1731439329607",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-19.jpg?v=1731439331620",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-20.jpg?v=1731439343786",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-21.jpg?v=1731439344731",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-22.jpg?v=1731439362726",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-23.jpg?v=1731439364081",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-24.jpg?v=1731439365707",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-25.jpg?v=1731439367727",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-26.jpg?v=1731439368223",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-27.jpg?v=1731439370816",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-28.jpg?v=1731439373593",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-29.jpg?v=1731439375533",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-30.jpg?v=1731439377324",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-31.jpg?v=1731439394973",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-32.jpg?v=1731439395011",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-33.jpg?v=1731439397318",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-34.jpg?v=1731439397408",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-35.jpg?v=1731439399500",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-36.jpg?v=1731439402486",
  "https://cdn.glitch.global/d021f2bf-ff20-45ae-b204-68044d42d68c/astar-360-37-edited-compressed.jpg?v=1738863715731",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-38.jpg?v=1731439406182",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-39.jpg?v=1731439407864",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-40.jpg?v=1731439409895",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-41.jpg?v=1731439411953",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-42.jpg?v=1731439414496",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-43.jpg?v=1731439416498",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-44.jpg?v=1731439418366",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-45.jpg?v=1731439419825",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-46.jpg?v=1731439422029",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-47.jpg?v=1731439431505",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-48.jpg?v=1731439432155",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-49.jpg?v=1731439433171",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-50.jpg?v=1731439435313",
  "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/astar-360-compressed-51.jpg?v=1731439437458",
  "https://cdn.glitch.global/d021f2bf-ff20-45ae-b204-68044d42d68c/astar-360-26-side-compressed.jpg?v=1738863696674",
];

const hotSpotInfo = [
  //hotspot index 0
  {
    spotIndex: 1, // when clicked, goes to this parorama image - index number
    visible: [0], // on which panorama index, will this hotspot will be shown
    pos: { x: -220, y: -100, z: -150 },
    iconType: "hotspot",
  },
  {
    spotIndex: 0,
    visible: [0],
    pos: { x: -65, y: 12, z: 30 },
    iconType: "infoIcon",
    tag: "IF",
  },
  //hotspot index 1
  {
    spotIndex: 0,
    visible: [1],
    pos: { x: 230, y: -100, z: -150 },
    iconType: "hotspot",
  },
  {
    spotIndex: 2,
    visible: [1],
    pos: { x: -200, y: -100, z: -55 },
    iconType: "hotspot",
  },
  //hotspot index 2
  {
    spotIndex: 1,
    visible: [2],
    pos: { x: 150, y: -100, z: -25 },
    iconType: "hotspot",
  },
  {
    spotIndex: 3,
    visible: [2],
    pos: { x: -220, y: -100, z: 100 },
    iconType: "hotspot",
  },
  {
    spotIndex: 4,
    visible: [2],
    pos: { x: -260, y: -100, z: -200 },
    iconType: "hotspot",
  },
  {
    spotIndex: 6,
    visible: [2],
    pos: { x: -350, y: -75, z: -35 },
    iconType: "hotspot",
  },
  //hotspot index 3
  {
    spotIndex: 2,
    visible: [3],
    pos: { x: 220, y: -100, z: -45 },
    iconType: "hotspot",
  },
  {
    spotIndex: 4,
    visible: [3],
    pos: { x: -10, y: -100, z: -300 },
    iconType: "hotspot",
  },
  {
    spotIndex: 5,
    visible: [3],
    pos: { x: -210, y: -80, z: -410 },
    iconType: "hotspot",
  },
  {
    spotIndex: 6,
    visible: [3],
    pos: { x: -260, y: -100, z: -200 },
    iconType: "hotspot",
  },
  {
    spotIndex: 7,
    visible: [3],
    pos: { x: -350, y: -100, z: -20 },
    iconType: "hotspot",
  },
  {
    spotIndex: 10,
    visible: [3],
    pos: { x: -380, y: -100, z: 120 },
    iconType: "hotspot",
  },
  {
    spotIndex: 3,
    visible: [3],
    pos: { x: -20, y: -3, z: 20 },
    iconType: "infoIcon",
    tag: "IFBOOKLET",
  },
  //hotspot index 4
  {
    spotIndex: 2,
    visible: [4],
    pos: { x: 270, y: -100, z: 120 },
    iconType: "hotspot",
  },
  {
    spotIndex: 3,
    visible: [4],
    pos: { x: 60, y: -100, z: 245 },
    iconType: "hotspot",
  },
  {
    spotIndex: 5,
    visible: [4],
    pos: { x: -265, y: -100, z: -140 },
    iconType: "hotspot",
  },
  {
    spotIndex: 6,
    visible: [4],
    pos: { x: -220, y: -100, z: 115 },
    iconType: "hotspot",
  },
  //hotspot index 5
  {
    spotIndex: 3,
    visible: [5],
    pos: { x: 250, y: -100, z: 340 },
    iconType: "hotspot",
  },
  {
    spotIndex: 4,
    visible: [5],
    pos: { x: 270, y: -100, z: 190 },
    iconType: "hotspot",
  },
  {
    spotIndex: 6,
    visible: [5],
    pos: { x: -5, y: -100, z: 270 },
    iconType: "hotspot",
  },
  //hotspot index 6
  {
    spotIndex: 3,
    visible: [6],
    pos: { x: 270, y: -100, z: 120 },
    iconType: "hotspot",
  },
  {
    spotIndex: 4,
    visible: [6],
    pos: { x: 240, y: -100, z: -130 },
    iconType: "hotspot",
  },
  {
    spotIndex: 5,
    visible: [6],
    pos: { x: -50, y: -100, z: -250 },
    iconType: "hotspot",
  },
  {
    spotIndex: 7,
    visible: [6],
    pos: { x: -50, y: -100, z: 150 },
    iconType: "hotspot",
  },
  {
    spotIndex: 9,
    visible: [6],
    pos: { x: 10, y: -100, z: 360 },
    iconType: "hotspot",
  },
  {
    spotIndex: 12,
    visible: [6],
    pos: { x: 140, y: -100, z: 390 },
    iconType: "hotspot",
  },
  {
    spotIndex: 6,
    visible: [6],
    pos: { x: -30, y: 0, z: 24 },
    iconType: "infoIcon",
    tag: "KKH",
  },
  {
    spotIndex: 6,
    visible: [6],
    pos: { x: -30, y: 0, z: 5 },
    iconType: "infoIcon",
    tag: "PARI",
  },
  {
    spotIndex: 6,
    visible: [6],
    pos: { x: -30, y: 0, z: -10 },
    iconType: "infoIcon",
    tag: "AASD",
  },
  {
    spotIndex: 6,
    visible: [6],
    pos: { x: -30, y: 0, z: -25 },
    iconType: "infoIcon",
    tag: "CONNECTOR",
  },
  //hotspot index 7
  {
    spotIndex: 3,
    visible: [7],
    pos: { x: 310, y: -100, z: -35 },
    iconType: "hotspot",
  },
  {
    spotIndex: 4,
    visible: [7],
    pos: { x: 300, y: -100, z: -300 },
    iconType: "hotspot",
  },
  {
    spotIndex: 6,
    visible: [7],
    pos: { x: 30, y: -100, z: -200 },
    iconType: "hotspot",
  },
  {
    spotIndex: 8,
    visible: [7],
    pos: { x: -200, y: -100, z: -10 },
    iconType: "hotspot",
  },
  {
    spotIndex: 9,
    visible: [7],
    pos: { x: 30, y: -100, z: 220 },
    iconType: "hotspot",
  },
  {
    spotIndex: 10,
    visible: [7],
    pos: { x: -60, y: -100, z: 160 },
    iconType: "hotspot",
  },
  {
    spotIndex: 12,
    visible: [7],
    pos: { x: 160, y: -100, z: 250 },
    iconType: "hotspot",
  },
  //hotspot index 8
  {
    spotIndex: 7,
    visible: [8],
    pos: { x: 200, y: -100, z: 30 },
    iconType: "hotspot",
  },
  //hotspot index 9
  {
    spotIndex: 6,
    visible: [9],
    pos: { x: 30, y: -90, z: -360 },
    iconType: "hotspot",
  },
  {
    spotIndex: 7,
    visible: [9],
    pos: { x: -40, y: -100, z: -230 },
    iconType: "hotspot",
  },
  {
    spotIndex: 10,
    visible: [9],
    pos: { x: -80, y: -100, z: -80 },
    iconType: "hotspot",
  },
  {
    spotIndex: 12,
    visible: [9],
    pos: { x: 150, y: -100, z: 80 },
    iconType: "hotspot",
  },
  {
    spotIndex: 13,
    visible: [9],
    pos: { x: -10, y: -100, z: 180 },
    iconType: "hotspot",
  },
  {
    spotIndex: 9,
    visible: [9],
    pos: { x: -30, y: 3, z: -6 },
    iconType: "infoIcon",
    tag: "SHRED",
  },
  //hotspot index 10
  {
    spotIndex: 3,
    visible: [10],
    pos: { x: 330, y: -100, z: -235 },
    iconType: "hotspot",
  },
  {
    spotIndex: 7,
    visible: [10],
    pos: { x: 10, y: -100, z: -180 },
    iconType: "hotspot",
  },
  {
    spotIndex: 9,
    visible: [10],
    pos: { x: 100, y: -100, z: 80 },
    iconType: "hotspot",
  },
  {
    spotIndex: 11,
    visible: [10],
    pos: { x: -200, y: -100, z: 30 },
    iconType: "hotspot",
  },
  {
    spotIndex: 12,
    visible: [10],
    pos: { x: 230, y: -100, z: 80 },
    iconType: "hotspot",
  },
  //hotspot index 11
  {
    spotIndex: 10,
    visible: [11],
    pos: { x: 200, y: -100, z: -35 },
    iconType: "hotspot",
  },
  //hotspot index 12
  {
    spotIndex: 6,
    visible: [12],
    pos: { x: -165, y: -90, z: -390 },
    iconType: "hotspot",
  },
  {
    spotIndex: 7,
    visible: [12],
    pos: { x: -230, y: -100, z: -250 },
    iconType: "hotspot",
  },
  {
    spotIndex: 9,
    visible: [12],
    pos: { x: -190, y: -100, z: -35 },
    iconType: "hotspot",
  },
  {
    spotIndex: 10,
    visible: [12],
    pos: { x: -250, y: -100, z: -80 },
    iconType: "hotspot",
  },
  {
    spotIndex: 13,
    visible: [12],
    pos: { x: -175, y: -100, z: 150 },
    iconType: "hotspot",
  },
  {
    spotIndex: 19,
    visible: [12],
    pos: { x: 50, y: -100, z: 330 },
    iconType: "hotspot",
  },
  {
    spotIndex: 20,
    visible: [12],
    pos: { x: 235, y: -100, z: 230 },
    iconType: "hotspot",
  },
  //hotspot index 13
  {
    spotIndex: 9,
    visible: [13],
    pos: { x: 20, y: -100, z: -185 },
    iconType: "hotspot",
  },
  {
    spotIndex: 12,
    visible: [13],
    pos: { x: 200, y: -100, z: -80 },
    iconType: "hotspot",
  },
  {
    spotIndex: 14,
    visible: [13],
    pos: { x: -50, y: -100, z: 210 },
    iconType: "hotspot",
  },
  {
    spotIndex: 13,
    visible: [13],
    pos: { x: -42, y: 0, z: -20 },
    iconType: "infoIcon",
    tag: "ANALYSER",
  },
  //hotspot index 14
  {
    spotIndex: 13,
    visible: [14],
    pos: { x: 10, y: -100, z: -190 },
    iconType: "hotspot",
  },
  {
    spotIndex: 15,
    visible: [14],
    pos: { x: 0, y: -100, z: 190 },
    iconType: "hotspot",
  },
  {
    spotIndex: 14,
    visible: [14],
    pos: { x: -30, y: 0, z: -16 },
    iconType: "infoIcon",
    tag: "REBEE",
  },
  //hotspot index 15
  {
    spotIndex: 14,
    visible: [15],
    pos: { x: 10, y: -100, z: -190 },
    iconType: "hotspot",
  },
  {
    spotIndex: 16,
    visible: [15],
    pos: { x: 10, y: -100, z: 180 },
    iconType: "hotspot",
  },
  //hotspot index 16
  {
    spotIndex: 15,
    visible: [16],
    pos: { x: 10, y: -100, z: -190 },
    iconType: "hotspot",
  },
  {
    spotIndex: 17,
    visible: [16],
    pos: { x: 180, y: -100, z: 10 },
    iconType: "hotspot",
  },
  {
    spotIndex: 30,
    visible: [16],
    pos: { x: -80, y: -100, z: 180 },
    iconType: "hotspot",
  },
  //hotspot index 17
  {
    spotIndex: 16,
    visible: [17],
    pos: { x: -180, y: -100, z: -10 },
    iconType: "hotspot",
  },
  {
    spotIndex: 18,
    visible: [17],
    pos: { x: 180, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 17,
    visible: [17],
    pos: { x: -8, y: 6, z: 30 },
    iconType: "infoIcon",
    tag: "AIRLEO",
  },
  //hotspot index 18
  {
    spotIndex: 17,
    visible: [18],
    pos: { x: -180, y: -100, z: -20 },
    iconType: "hotspot",
  },
  {
    spotIndex: 19,
    visible: [18],
    pos: { x: -90, y: -100, z: -300 },
    iconType: "hotspot",
  },
  {
    spotIndex: 26,
    visible: [18],
    pos: { x: 110, y: -100, z: 250 },
    iconType: "hotspot",
  },
  {
    spotIndex: 35,
    visible: [18],
    pos: { x: 270, y: -80, z: 330 },
    iconType: "hotspot",
  },
  //hotspot index 19
  {
    spotIndex: 18,
    visible: [19],
    pos: { x: 140, y: -100, z: 300 },
    iconType: "hotspot",
  },
  {
    spotIndex: 12,
    visible: [19],
    pos: { x: -80, y: -100, z: -350 },
    iconType: "hotspot",
  },
  {
    spotIndex: 20,
    visible: [19],
    pos: { x: 190, y: -100, z: -180 },
    iconType: "hotspot",
  },
  //hotspot index 20
  {
    spotIndex: 12,
    visible: [20],
    pos: { x: -200, y: -100, z: -200 },
    iconType: "hotspot",
  },
  {
    spotIndex: 19,
    visible: [20],
    pos: { x: -200, y: -100, z: 140 },
    iconType: "hotspot",
  },
  {
    spotIndex: 21,
    visible: [20],
    pos: { x: 20, y: -100, z: 160 },
    iconType: "hotspot",
  },
  {
    spotIndex: 22,
    visible: [20],
    pos: { x: 200, y: -100, z: 80 },
    iconType: "hotspot",
  },
  //hotspot index 21
  {
    spotIndex: 20,
    visible: [21],
    pos: { x: -20, y: -100, z: -160 },
    iconType: "hotspot",
  },
  {
    spotIndex: 22,
    visible: [21],
    pos: { x: 190, y: -100, z: -80 },
    iconType: "hotspot",
  },
  {
    spotIndex: 21,
    visible: [21],
    pos: { x: 25, y: 5, z: 20 },
    iconType: "infoIcon",
    tag: "SMOODER",
  },
  //hotspot index 22
  {
    spotIndex: 21,
    visible: [22],
    pos: { x: -190, y: -100, z: 30 },
    iconType: "hotspot",
  },
  {
    spotIndex: 20,
    visible: [22],
    pos: { x: -200, y: -100, z: -120 },
    iconType: "hotspot",
  },
  {
    spotIndex: 23,
    visible: [22],
    pos: { x: -50, y: -100, z: 300 },
    iconType: "hotspot",
  },
  //hotspot index 23
  {
    spotIndex: 22,
    visible: [23],
    pos: { x: -100, y: -100, z: -300 },
    iconType: "hotspot",
  },
  {
    spotIndex: 24,
    visible: [23],
    pos: { x: -50, y: -100, z: 210 },
    iconType: "hotspot",
  },
  {
    spotIndex: 23,
    visible: [23],
    pos: { x: -30, y: 5, z: -33 },
    iconType: "infoIcon",
    tag: "CRUNCH",
  },
  {
    spotIndex: 23,
    visible: [23],
    pos: { x: -30, y: -10, z: 0 },
    iconType: "infoIcon",
    tag: "VERTICALAUTOMATION",
  },
  //hotspot index 24
  {
    spotIndex: 23,
    visible: [24],
    pos: { x: 150, y: -100, z: -150 },
    iconType: "hotspot",
  },
  {
    spotIndex: 25,
    visible: [24],
    pos: { x: -210, y: -100, z: 0 },
    iconType: "hotspot",
  },
  //hotspot index 25
  {
    spotIndex: 24,
    visible: [25],
    pos: { x: 180, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 26,
    visible: [25],
    pos: { x: -210, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 34,
    visible: [25],
    pos: { x: -180, y: -100, z: 250 },
    iconType: "hotspot",
  },
  {
    spotIndex: 35,
    visible: [25],
    pos: { x: 30, y: -100, z: 380 },
    iconType: "hotspot",
  },
  {
    spotIndex: 51,
    visible: [25],
    pos: { x: -110, y: -100, z: -60 },
    iconType: "hotspot",
  },
  {
    spotIndex: 25,
    visible: [25],
    pos: { x: 30, y: 1, z: -40 },
    iconType: "infoIcon",
    tag: "LAMPPOST",
  },
  //hotspot index 26
  {
    spotIndex: 18,
    visible: [26],
    pos: { x: -50, y: -100, z: -280 },
    iconType: "hotspot",
  },
  {
    spotIndex: 25,
    visible: [26],
    pos: { x: 150, y: -100, z: -60 },
    iconType: "hotspot",
  },
  {
    spotIndex: 27,
    visible: [26],
    pos: { x: -260, y: -100, z: -50 },
    iconType: "hotspot",
  },
  {
    spotIndex: 34,
    visible: [26],
    pos: { x: 30, y: -100, z: 230 },
    iconType: "hotspot",
  },
  {
    spotIndex: 35,
    visible: [26],
    pos: { x: 220, y: -100, z: 230 },
    iconType: "hotspot",
  },
  //hotspot index 27
  {
    spotIndex: 26,
    visible: [27],
    pos: { x: 260, y: -100, z: 20 },
    iconType: "hotspot",
  },
  {
    spotIndex: 28,
    visible: [27],
    pos: { x: -280, y: -100, z: -40 },
    iconType: "hotspot",
  },
  {
    spotIndex: 30,
    visible: [27],
    pos: { x: -280, y: -100, z: -150 },
    iconType: "hotspot",
  },
  //hotspot index 28
  {
    spotIndex: 27,
    visible: [28],
    pos: { x: 270, y: -100, z: -20 },
    iconType: "hotspot",
  },
  {
    spotIndex: 29,
    visible: [28],
    pos: { x: -60, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 30,
    visible: [28],
    pos: { x: 0, y: -100, z: -130 },
    iconType: "hotspot",
  },
  {
    spotIndex: 32,
    visible: [28],
    pos: { x: 120, y: -100, z: 260 },
    iconType: "hotspot",
  },
  //hotspot index 29
  {
    spotIndex: 28,
    visible: [29],
    pos: { x: 60, y: -100, z: 0 },
    iconType: "hotspot",
  },
  //hotspot index 30
  {
    spotIndex: 16,
    visible: [30],
    pos: { x: 90, y: -100, z: -150 },
    iconType: "hotspot",
  },
  {
    spotIndex: 27,
    visible: [30],
    pos: { x: 280, y: -100, z: 130 },
    iconType: "hotspot",
  },
  {
    spotIndex: 28,
    visible: [30],
    pos: { x: 0, y: -100, z: 130 },
    iconType: "hotspot",
  },
  {
    spotIndex: 31,
    visible: [30],
    pos: { x: -60, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 32,
    visible: [30],
    pos: { x: 100, y: -100, z: 390 },
    iconType: "hotspot",
  },
  //hotspot index 31
  {
    spotIndex: 30,
    visible: [31],
    pos: { x: 60, y: -100, z: 0 },
    iconType: "hotspot",
  },
  //hotspot index 32
  {
    spotIndex: 28,
    visible: [32],
    pos: { x: 120, y: -100, z: 260 },
    iconType: "hotspot",
  },
  {
    spotIndex: 33,
    visible: [32],
    pos: { x: -230, y: -100, z: 65 },
    iconType: "hotspot",
  },
  {
    spotIndex: 50,
    visible: [32],
    pos: { x: -20, y: -100, z: -80 },
    iconType: "hotspot",
  },
  //hotspot index 33
  {
    spotIndex: 32,
    visible: [33],
    pos: { x: -230, y: -100, z: 50 },
    iconType: "hotspot",
  },
  {
    spotIndex: 34,
    visible: [33],
    pos: { x: 280, y: -100, z: -50 },
    iconType: "hotspot",
  },
  //hotspot index 34
  {
    spotIndex: 25,
    visible: [34],
    pos: { x: 20, y: -100, z: -300 },
    iconType: "hotspot",
  },
  {
    spotIndex: 26,
    visible: [34],
    pos: { x: -120, y: -100, z: -250 },
    iconType: "hotspot",
  },
  {
    spotIndex: 33,
    visible: [34],
    pos: { x: -280, y: -100, z: 50 },
    iconType: "hotspot",
  },
  {
    spotIndex: 35,
    visible: [34],
    pos: { x: 220, y: -100, z: 10 },
    iconType: "hotspot",
  },
  //hotspot index 35
  {
    spotIndex: 25,
    visible: [35],
    pos: { x: -40, y: -100, z: -360 },
    iconType: "hotspot",
  },
  {
    spotIndex: 26,
    visible: [35],
    pos: { x: -240, y: -100, z: -350 },
    iconType: "hotspot",
  },
  {
    spotIndex: 34,
    visible: [35],
    pos: { x: -280, y: -100, z: -125 },
    iconType: "hotspot",
  },
  {
    spotIndex: 36,
    visible: [35],
    pos: { x: 20, y: -100, z: 230 },
    iconType: "hotspot",
  },
  //hotspot index 36
  {
    spotIndex: 35,
    visible: [36],
    pos: { x: 200, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 37,
    visible: [36],
    pos: { x: -300, y: -100, z: -30 },
    iconType: "hotspot",
  },
  {
    spotIndex: 36,
    visible: [36],
    pos: { x: 10, y: 0, z: -50 },
    iconType: "infoIcon",
    tag: "COWORKINGDESK",
  },
  //hotspot index 37
  {
    spotIndex: 36,
    visible: [37],
    pos: { x: 50, y: -100, z: -260 },
    iconType: "hotspot",
  },
  {
    spotIndex: 38,
    visible: [37],
    pos: { x: 10, y: -100, z: 270 },
    iconType: "hotspot",
  },
  //hotspot index 38
  {
    spotIndex: 37,
    visible: [38],
    pos: { x: 0, y: -100, z: -300 },
    iconType: "hotspot",
  },
  {
    spotIndex: 39,
    visible: [38],
    pos: { x: -180, y: -100, z: 120 },
    iconType: "hotspot",
  },
  {
    spotIndex: 38,
    visible: [38],
    pos: { x: 50, y: 10, z: 30 },
    iconType: "infoIcon",
    tag: "ROPLUS",
  },
  //hotspot index 39
  {
    spotIndex: 38,
    visible: [39],
    pos: { x: 150, y: -100, z: -180 },
    iconType: "hotspot",
  },
  {
    spotIndex: 40,
    visible: [39],
    pos: { x: -265, y: -100, z: -25 },
    iconType: "hotspot",
  },
  //hotspot index 40
  {
    spotIndex: 39,
    visible: [40],
    pos: { x: 260, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 41,
    visible: [40],
    pos: { x: -275, y: -100, z: 0 },
    iconType: "hotspot",
  },
  //hotspot index 41
  {
    spotIndex: 40,
    visible: [41],
    pos: { x: 290, y: -100, z: -15 },
    iconType: "hotspot",
  },
  {
    spotIndex: 42,
    visible: [41],
    pos: { x: -150, y: -100, z: 15 },
    iconType: "hotspot",
  },
  {
    spotIndex: 47,
    visible: [41],
    pos: { x: -160, y: -100, z: -75 },
    iconType: "hotspot",
  },
  //hotspot index 42
  {
    spotIndex: 41,
    visible: [42],
    pos: { x: 170, y: -100, z: -30 },
    iconType: "hotspot",
  },
  {
    spotIndex: 43,
    visible: [42],
    pos: { x: -140, y: -100, z: -20 },
    iconType: "hotspot",
  },
  //hotspot index 43
  {
    spotIndex: 42,
    visible: [43],
    pos: { x: 140, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 44,
    visible: [43],
    pos: { x: -135, y: -100, z: 0 },
    iconType: "hotspot",
  },
  {
    spotIndex: 47,
    visible: [42],
    pos: { x: 20, y: -100, z: -125 },
    iconType: "hotspot",
  },
  //hotspot index 44
  {
    spotIndex: 43,
    visible: [44],
    pos: { x: 130, y: -100, z: -10 },
    iconType: "hotspot",
  },
  {
    spotIndex: 45,
    visible: [44],
    pos: { x: 0, y: -100, z: -125 },
    iconType: "hotspot",
  },
  //hotspot index 45
  {
    spotIndex: 44,
    visible: [45],
    pos: { x: 10, y: -100, z: 110 },
    iconType: "hotspot",
  },
  {
    spotIndex: 46,
    visible: [45],
    pos: { x: 130, y: -100, z: -10 },
    iconType: "hotspot",
  },
  //hotspot index 46
  {
    spotIndex: 45,
    visible: [46],
    pos: { x: -115, y: -100, z: -15 },
    iconType: "hotspot",
  },
  {
    spotIndex: 47,
    visible: [46],
    pos: { x: 130, y: -100, z: 15 },
    iconType: "hotspot",
  },
  //hotspot index 47
  {
    spotIndex: 41,
    visible: [47],
    pos: { x: 160, y: -100, z: 75 },
    iconType: "hotspot",
  },
  {
    spotIndex: 42,
    visible: [47],
    pos: { x: 0, y: -100, z: 125 },
    iconType: "hotspot",
  },
  {
    spotIndex: 46,
    visible: [47],
    pos: { x: -150, y: -100, z: 20 },
    iconType: "hotspot",
  },
  {
    spotIndex: 48,
    visible: [47],
    pos: { x: -60, y: -100, z: -200 },
    iconType: "hotspot",
  },
  //hotspot index 48
  {
    spotIndex: 47,
    visible: [48],
    pos: { x: -60, y: -100, z: -200 },
    iconType: "hotspot",
  },
  {
    spotIndex: 49,
    visible: [48],
    pos: { x: 255, y: -100, z: 35 },
    iconType: "hotspot",
  },
  //hotspot index 49
  {
    spotIndex: 48,
    visible: [49],
    pos: { x: -310, y: -100, z: 30 },
    iconType: "hotspot",
  },
  {
    spotIndex: 50,
    visible: [49],
    pos: { x: 50, y: -100, z: 320 },
    iconType: "hotspot",
  },
  //hotspot index 50
  {
    spotIndex: 32,
    visible: [50],
    pos: { x: 5, y: -100, z: 75 },
    iconType: "hotspot",
  },
  {
    spotIndex: 49,
    visible: [50],
    pos: { x: 0, y: -100, z: -335 },
    iconType: "hotspot",
  },

  // hotspot index 51
  {
    spotIndex: 25,
    visible: [51],
    pos: { x: -20, y: -100, z: -100 },
    iconType: "hotspot",
  },
  {
    spotIndex: 51,
    visible: [51],
    pos: { x: -20, y: 4, z: -10 },
    iconType: "infoIcon",
    tag: "BATTERYSWAP",
  },
];

const TransitionShader = {
  uniforms: {
    tDiffuse1: { value: null }, // First texture (current panorama)
    tDiffuse2: { value: null }, // Second texture (target panorama)
    progress: { value: 0.0 }, // Progress value for blending
  },
  vertexShader: `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,
  fragmentShader: `
      uniform sampler2D tDiffuse1;
      uniform sampler2D tDiffuse2;
      uniform float progress;
      varying vec2 vUv;
      
      void main() {
          vec4 tex1 = texture2D(tDiffuse1, vUv);
          vec4 tex2 = texture2D(tDiffuse2, vUv);
          gl_FragColor = mix(tex1, tex2, progress); // Blend the textures based on progress
      }
  `,
};

let camera, scene, renderer;
let composer,
  renderTarget1,
  renderTarget2,
  renderPass1,
  renderPass2,
  transitionPass;
let spheres = {};
let hotspotMeshes = [];

let currentSphere;
let nextSphere;

let currentSphereIndex = 0;
let transitionProgress = 0;
let transitionSpeed = 0.01;

let transitioning = false;

let clock = new THREE.Clock();
let hotspotMesh, infoIconMesh;

let isUserInteracting = false,
  onPointerDownMouseX = 0,
  onPointerDownMouseY = 0,
  lon = 220,
  onPointerDownLon = 0,
  lat = 0,
  onPointerDownLat = 0,
  phi = 0,
  theta = 0,
  pinchStartDistance = 0,
  pinchStartFov = 0;

const MIN_ZOOM = 60;
const MAX_ZOOM = 80;
const DEFAULT_ZOOM = MAX_ZOOM;

init();
animate();

function init() {
  const container = document.getElementById("image-container");

  camera = new THREE.PerspectiveCamera(
    DEFAULT_ZOOM,
    window.innerWidth / window.innerHeight,
    1,
    1100
  );
  scene = new THREE.Scene();

  const url = new URL(window.location.href);
  const sphereRaw = url.searchParams.get("sphere") || "0";
  currentSphereIndex = parseInt(sphereRaw);

  if (currentSphereIndex >= 0 && currentSphereIndex < panoramas.length) {
    const sphere = loadSphere(
      panoramas[currentSphereIndex],
      currentSphereIndex
    );
    currentSphere = sphere;
  }

  const hotspotTexture = new THREE.TextureLoader().load(
    "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/hotspot-icon.png?v=1731393671236"
  ); // Load the arrow image
  const hotspotMaterial = new THREE.MeshBasicMaterial({
    map: hotspotTexture,
    transparent: true,
  });
  const hotspotGeometry = new THREE.PlaneGeometry(40, 20);
  hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial);

  const infoIconTexture = new THREE.TextureLoader().load(
    "https://cdn.glitch.global/8c57fbb6-e387-4013-9f06-518f8f497bac/information-icon.png?v=1731401321964"
  );
  const infoIconMaterial = new THREE.MeshBasicMaterial({
    map: infoIconTexture,
    transparent: true,
  });
  const infoIconGeometry = new THREE.PlaneGeometry(12, 12);
  infoIconMesh = new THREE.Mesh(infoIconGeometry, infoIconMaterial);

  hotSpotInfo.forEach((e) => {
    if (e.visible.includes(currentSphereIndex)) {
      let mesh;
      if (e.iconType === "hotspot") {
        mesh = hotspotMesh.clone();
      } else if (e.iconType === "infoIcon") {
        mesh = infoIconMesh.clone();
        mesh.scale.set(0.4, 0.4, 0.4);
      }
      mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
      mesh.lookAt(camera.position);
      mesh.userData.spotIndex = e.spotIndex;
      mesh.userData.visibleSpheres = e.visible;
      mesh.userData.iconType = e.iconType;
      mesh.userData.tag = e.tag;
      mesh.visible = true;
      scene.add(mesh);
      hotspotMeshes.push(mesh);
    }
  });

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  container.style.touchAction = "none";
  container.addEventListener("pointerdown", onPointerDown);

  container.addEventListener("wheel", onDocumentMouseWheel);

  container.addEventListener("touchstart", onTouchStart);
  container.addEventListener("touchmove", onTouchMove);
  container.addEventListener("touchend", onTouchEnd);

  window.addEventListener("resize", onWindowResize);

  //Handles mesh clicks
  renderer.domElement.addEventListener("click", onDocumentClick);

  composer = new EffectComposer(renderer);
  renderTarget1 = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight
  );
  renderTarget2 = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight
  );

  // Set up render passes for each panorama
  renderPass1 = new RenderPass(scene, camera);
  renderPass2 = new RenderPass(scene, camera);
  renderPass1.renderToScreen = false;
  renderPass2.renderToScreen = false;

  // Transition shader pass
  transitionPass = new ShaderPass(TransitionShader);

  transitionPass.uniforms.tDiffuse1.value = renderTarget1.texture;
  transitionPass.uniforms.tDiffuse2.value = renderTarget2.texture;
  transitionPass.uniforms.progress.value = 0.0;
  composer.addPass(transitionPass);

  //composer.addPass(bloomPass);

  transitionProgress = 0.0;
  transitionSpeed = 0.01;
}

function onTouchStart(event) {
  if (event.touches.length === 2) {
    isUserInteracting = true;
    let touch1 = event.touches[0];
    let touch2 = event.touches[1];
    pinchStartDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
    pinchStartFov = camera.fov;
  }
}

function onTouchMove(event) {
  if (event.touches.length === 2 && isUserInteracting) {
    let touch1 = event.touches[0];
    let touch2 = event.touches[1];
    let pinchCurrentDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
    let pinchScale = pinchStartDistance / pinchCurrentDistance;
    camera.fov = THREE.MathUtils.clamp(
      pinchStartFov * pinchScale,
      30,
      MAX_ZOOM
    );
    camera.updateProjectionMatrix();
  }
}

function onTouchEnd(event) {
  if (event.touches.length < 2) {
    isUserInteracting = false;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  isUserInteracting = true;

  onPointerDownMouseX = event.clientX;
  onPointerDownMouseY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
  lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
}

function onPointerUp() {
  if (event.isPrimary === false) return;

  isUserInteracting = false;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);

  clock.elapsedTime = 0;
}

function onDocumentMouseWheel(event) {
  const fov = camera.fov + event.deltaY * 0.05;

  camera.fov = THREE.MathUtils.clamp(fov, MIN_ZOOM, MAX_ZOOM);

  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  update();
}

function update() {
  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  const x = 500 * Math.sin(phi) * Math.cos(theta);
  const y = 500 * Math.cos(phi);
  const z = 500 * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(x, y, z);

  if (transitioning) {
    hotspotMeshes.forEach((mesh) => (mesh.visible = false));

    // Update the transition progress
    transitionProgress += transitionSpeed;

    // Limit the progress to 1.0 and stop the transition when complete
    if (transitionProgress >= 1.0) {
      transitionProgress = 1.0;
      transitioning = false;
      currentSphere.visible = false;
      nextSphere.visible = true;

      currentSphere = spheres[currentSphereIndex];

      hotspotMeshes.forEach((mesh) => {
        mesh.visible =
          mesh.userData.visibleSpheres.includes(currentSphereIndex);
      });
    }

    // Set the progress of the transition in the shader
    transitionPass.uniforms.progress.value = transitionProgress;
    // console.log(transitionProgress);
    if (transitionProgress < 0.5) {
      camera.fov = THREE.MathUtils.lerp(80, 60, transitionProgress);
    } else {
      camera.fov = DEFAULT_ZOOM;
    }

    camera.updateProjectionMatrix();
  }

  currentSphere.visible = true;
  if (nextSphere) {
    nextSphere.visible = false;
  }

  // Render the first panorama to its render target
  renderer.setRenderTarget(renderTarget1);
  renderer.render(scene, camera);

  currentSphere.visible = false;
  if (nextSphere) {
    nextSphere.visible = true;
  }

  // Render the second panorama to its render target
  renderer.setRenderTarget(renderTarget2);
  renderer.render(scene, camera);

  // Reset render target and update transition progress
  renderer.setRenderTarget(null);

  // Render final effect
  composer.render();
}

function selectImage(currentIndex) {
  nextSphere = loadSphere(panoramas[currentIndex], currentIndex);
  transitioning = true;
  transitionProgress = 0.0;

  hotspotMeshes.forEach((mesh) => {
    scene.remove(mesh);
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) mesh.material.dispose();
  });
  hotspotMeshes.length = 0;

  hotSpotInfo.forEach((e) => {
    if (e.visible.includes(currentIndex)) {
      let mesh;
      if (e.iconType === "hotspot") {
        mesh = hotspotMesh.clone();
      } else if (e.iconType === "infoIcon") {
        mesh = infoIconMesh.clone();
        mesh.scale.set(0.4, 0.4, 0.4);
      }
      mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
      mesh.lookAt(camera.position);
      mesh.userData.spotIndex = e.spotIndex;
      mesh.userData.visibleSpheres = e.visible;
      mesh.userData.iconType = e.iconType;
      mesh.userData.tag = e.tag;
      mesh.visible = true;
      scene.add(mesh);
      hotspotMeshes.push(mesh);
    }
  });

  showLocationContent(currentIndex);

  // remove modal if any is shown
  const modalElement = document.getElementById("hotspot-detail-modal");
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}

//Function for showing the content of the respective locations
function showLocationContent(sphereIndex) {
  const url = new URL(window.location.href);
  url.searchParams.set("sphere", sphereIndex);
  history.pushState({}, "", url);
  dispatchEvent(
    new PopStateEvent("popstate", {
      state: { source: "hotspot-change-location" },
    })
  );
}

function showIconContent(intersectedMesh) {
  const url = new URL(window.location);

  url.searchParams.set("contentId", intersectedMesh.userData.tag);
  history.pushState({}, "", url);
  dispatchEvent(
    new PopStateEvent("popstate", { state: { source: "show-icon-content" } })
  );
}

// Function to handle click events on the document
function onDocumentClick(event) {
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  // Find intersections with hotspot meshes
  let intersectsHotspotMesh = raycaster.intersectObjects(hotspotMeshes);

  // If there are intersections, execute your function or code
  if (intersectsHotspotMesh.length > 0) {
    let intersectedMesh = intersectsHotspotMesh[0].object;

    if (
      intersectedMesh.userData.spotIndex !== currentSphereIndex &&
      intersectedMesh.visible !== false
    ) {
      //Logic when clicking on hotspots only
      //ensures that hotspots are not clickable when still in the midst of transitioning
      currentSphereIndex = intersectedMesh.userData.spotIndex;
      selectImage(currentSphereIndex);
    } else {
      showIconContent(intersectedMesh);
    }
  }
}

// for handling floorplan clicks
window.addEventListener("popstate", (event) => {
  if (!event.state) {
    return;
  }

  if (event.state.source !== "floor-plan") {
    return;
  }

  hotspotMeshes.forEach((mesh) => {
    scene.remove(mesh);
  });

  const url = new URL(window.location.href);
  const sphereRaw = url.searchParams.get("sphere") || "0";
  currentSphereIndex = parseInt(sphereRaw);

  if (currentSphereIndex >= 0 && currentSphereIndex < panoramas.length) {
    nextSphere = loadSphere(panoramas[currentSphereIndex], currentSphereIndex);
    transitioning = true;
    transitionProgress = 0.0;
  }

  hotSpotInfo.forEach((e) => {
    if (e.visible.includes(currentSphereIndex)) {
      let mesh;
      if (e.iconType === "hotspot") {
        mesh = hotspotMesh.clone();
      } else if (e.iconType === "infoIcon") {
        mesh = infoIconMesh.clone();
        mesh.scale.set(0.4, 0.4, 0.4);
      }
      mesh.position.set(e.pos.x, e.pos.y, e.pos.z);
      mesh.lookAt(camera.position);
      mesh.userData.spotIndex = e.spotIndex;
      mesh.userData.visibleSpheres = e.visible;
      mesh.userData.iconType = e.iconType;
      mesh.userData.tag = e.tag;
      mesh.visible = true;
      scene.add(mesh);
      hotspotMeshes.push(mesh);
    }
  });
});

function loadSphere(image, index) {
  if (spheres[index]) {
    return spheres[index];
  }

  // Geometry for panorama spheres
  const geometry = new THREE.SphereGeometry(500, 64, 64);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(image);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter; // Use linear filtering for minification
  texture.magFilter = THREE.LinearFilter; // Use linear filtering for magnification
  texture.generateMipmaps = true; // Generate mipmaps for better quality at different scales
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);

  sphere.userData.index = index;
  sphere.visible = true;
  spheres[index] = sphere;
  scene.add(sphere);

  return sphere;
}
