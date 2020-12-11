<template>
  <div class="sc">
    <!-- header and nav -->
    <transition name="slideup">
      <header v-show="showHeader" class="header">
        <div class="header__left">
          <h1>kloud.city</h1>
          <img
            class="header__left__buildings-png"
            src="@/assets/png/header_left_buildingstest.png"
            alt=""
          />
          <CloudLeft class="cloud-left" />
        </div>
        <div class="header__center">
          <span>header center</span>
          <CloudLeftDiv class="cloud-left-div" />
          <CloudRightDiv class="cloud-right-div" />
          <CloudBase class="cloud-base" />
        </div>
        <div class="header__right">
          <nav>
            <a href="#">link 1</a>
            <a href="#">link 2</a>
            <a href="#">link 3</a>
            <CloudRight class="cloud-right" />
          </nav>
        </div>
      </header>
    </transition>

    <!-- body -->
    <section class="body">
      <!-- close button -->
      <transition name="fade">
        <button
          v-show="showClose"
          class="body__button body__button--close"
          @click="toggleUI()"
        >
          <TimesSolid />
        </button>
      </transition>

      <!-- canvas -->
      <div id="ccont">
        <canvas id="c"></canvas>
      </div>

      <!-- buttons -->
      <transition name="fade">
        <div v-show="showButtons" class="body__buttons">
          <button class="body__button" @click="toggleBuildModal()">
            BUILD
          </button>
          <button class="body__button" @click="toggleUI()">
            EXPLORE
          </button>
        </div>
      </transition>
    </section>

    <!-- footer -->
    <transition name="slidedown">
      <footer v-show="showFooter" class="footer"></footer>
    </transition>

    <!-- build modal -->
    <transition name="fade">
      <div v-show="showBuildModal" class="build-modal">
        <div class="build-modal__body">
          <button class="modal-close" @click="closeBuildModal()">
            <TimesSolid />
          </button>
          <h3>Design a Building</h3>
          <br />
          <span>Building Name</span><br />
          <input type="text" /><br /><br />
          <span>Architect Name</span><br />
          <input type="text" /><br /><br />
          <span>Building Description</span><br />
          <textarea id="building-desc" name="building-desc" rows="4" cols="50">
            Building description goes here.
          </textarea
          ><br /><br />
          <span>Stories: {{ this.storiesSelect }} </span><br />
          <input
            v-model="storiesSelect"
            type="range"
            min="1"
            max="8"
            value="1"
            class="slider"
          /><br /><br />
          <span>Upload</span><br />
          <input type="file" id="myFile" name="filename" /><br /><br />
          <button class="build-button" @click="closeBuildModal()">BUILD</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CloudLeft from "@/assets/svg/header/cloud-left.svg";
import CloudLeftDiv from "@/assets/svg/header/cloud-left-div.svg";
import CloudRight from "@/assets/svg/header/cloud-right.svg";
import CloudRightDiv from "@/assets/svg/header/cloud-right-div.svg";
import CloudBase from "@/assets/svg/header/cloud-base.svg";
import TimesSolid from "@/assets/icons/times-solid.svg";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import SCLogo from "../assets/sc-logo.svg";

let canvas, camera, scene, renderer;
// let geometry, material, mesh;

export default {
  name: "SprawlingCity",
  // components: {
  // },
  components: {
    CloudLeft,
    CloudLeftDiv,
    CloudRight,
    CloudRightDiv,
    CloudBase,
    TimesSolid
  },
  data() {
    return {
      cityCanvas: null,
      showHeader: true,
      showFooter: true,
      showButtons: true,
      showBuildModal: false,
      showClose: false,
      storiesSelect: 1
    };
  },
  methods: {
    init: function() {
      // canvas
      this.cityCanvas = document.querySelector("#c");
      canvas = this.cityCanvas;

      // renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

      // scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      // camera
      const fov = 40;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 1000;
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(60, 23, 60);
      camera.lookAt(0, 0, 0);

      // controls
      const controls = new OrbitControls(camera, renderer.domElement);
      if (controls) {
        console.log("orbit controls activated");
      }

      // lighting
      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }
      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(1, -2, -4);
        scene.add(light);
      }

      // init objects array
      const objects = [];

      // data for cities
      const cities = [
        {
          cityId: "0000-0000-0001",
          name: "Sprawling City",
          maxPlots: 625,
          blueprint: [
            [
              { a: 1, b: 601, c: "10A", coord: [-30, -30] },
              { a: 2, b: 602, c: "11A", coord: [-30, -27.5] },
              { a: 3, b: 603, c: "12A", coord: [-30, -25] },
              { a: 4, b: 604, c: "13A", coord: [-30, -22.5] },
              { a: 5, b: 605, c: "14A", coord: [-30, -20] },
              { a: 6, b: 606, c: "15A", coord: [-30, -17.5] },
              { a: 7, b: 607, c: "16A", coord: [-30, -15] },
              { a: 8, b: 608, c: "17A", coord: [-30, -12.5] },
              { a: 9, b: 609, c: "18A", coord: [-30, -10] },
              { a: 10, b: 610, c: "19A", coord: [-30, -7.5] },
              { a: 11, b: 611, c: "20A", coord: [-30, -5] },
              { a: 12, b: 612, c: "21A", coord: [-30, -2.5] },
              { a: 13, b: 613, c: "22A", coord: [-30, 0] },
              { a: 14, b: 614, c: "23A", coord: [-30, 2.5] },
              { a: 15, b: 615, c: "24A", coord: [-30, 5] },
              { a: 16, b: 616, c: "25A", coord: [-30, 7.5] },
              { a: 17, b: 617, c: "26A", coord: [-30, 10] },
              { a: 18, b: 618, c: "27A", coord: [-30, 12.5] },
              { a: 19, b: 619, c: "28A", coord: [-30, 15] },
              { a: 20, b: 620, c: "29A", coord: [-30, 17.5] },
              { a: 21, b: 621, c: "30A", coord: [-30, 20] },
              { a: 22, b: 622, c: "31A", coord: [-30, 22.5] },
              { a: 23, b: 623, c: "32A", coord: [-30, 25] },
              { a: 24, b: 624, c: "33A", coord: [-30, 27.5] },
              { a: 25, b: 625, c: "34A", coord: [-30, 30] }
            ],
            [
              { a: 26, b: 600, c: "10B", coord: [-27.5, -30] },
              { a: 27, b: 507, c: "11B", coord: [-27.5, -27.5] },
              { a: 28, b: 508, c: "12B", coord: [-27.5, -25] },
              { a: 29, b: 509, c: "13B", coord: [-27.5, -22.5] },
              { a: 30, b: 510, c: "14B", coord: [-27.5, -20] },
              { a: 31, b: 511, c: "15B", coord: [-27.5, -17.5] },
              { a: 32, b: 512, c: "16B", coord: [-27.5, -15] },
              { a: 33, b: 513, c: "17B", coord: [-27.5, -12.5] },
              { a: 34, b: 514, c: "18B", coord: [-27.5, -10] },
              { a: 35, b: 515, c: "19B", coord: [-27.5, -7.5] },
              { a: 36, b: 516, c: "20B", coord: [-27.5, -5] },
              { a: 37, b: 517, c: "21B", coord: [-27.5, -2.5] },
              { a: 38, b: 518, c: "22B", coord: [-27.5, 0] },
              { a: 39, b: 519, c: "23B", coord: [-27.5, 2.5] },
              { a: 40, b: 520, c: "24B", coord: [-27.5, 5] },
              { a: 41, b: 521, c: "25B", coord: [-27.5, 7.5] },
              { a: 42, b: 522, c: "26B", coord: [-27.5, 10] },
              { a: 43, b: 523, c: "27B", coord: [-27.5, 12.5] },
              { a: 44, b: 524, c: "28B", coord: [-27.5, 15] },
              { a: 45, b: 525, c: "29B", coord: [-27.5, 17.5] },
              { a: 46, b: 526, c: "30B", coord: [-27.5, 20] },
              { a: 47, b: 527, c: "31B", coord: [-27.5, 22.5] },
              { a: 48, b: 528, c: "32B", coord: [-27.5, 25] },
              { a: 49, b: 529, c: "33B", coord: [-27.5, 27.5] },
              { a: 50, b: 530, c: "34B", coord: [-27.5, 30] }
            ],
            [
              { a: 51, b: 599, c: "10C", coord: [-25, -30] },
              { a: 52, b: 506, c: "11C", coord: [-25, -27.5] },
              { a: 53, b: 421, c: "12C", coord: [-25, -25] },
              { a: 54, b: 422, c: "13C", coord: [-25, -22.5] },
              { a: 55, b: 423, c: "14C", coord: [-25, -20] },
              { a: 56, b: 424, c: "15C", coord: [-25, -17.5] },
              { a: 57, b: 425, c: "16C", coord: [-25, -15] },
              { a: 58, b: 426, c: "17C", coord: [-25, -12.5] },
              { a: 59, b: 427, c: "18C", coord: [-25, -10] },
              { a: 60, b: 428, c: "19C", coord: [-25, -7.5] },
              { a: 61, b: 429, c: "20C", coord: [-25, -5] },
              { a: 62, b: 430, c: "21C", coord: [-25, -2.5] },
              { a: 63, b: 431, c: "22C", coord: [-25, 0] },
              { a: 64, b: 432, c: "23C", coord: [-25, 2.5] },
              { a: 65, b: 433, c: "24C", coord: [-25, 5] },
              { a: 66, b: 434, c: "25C", coord: [-25, 7.5] },
              { a: 67, b: 435, c: "26C", coord: [-25, 10] },
              { a: 68, b: 436, c: "27C", coord: [-25, 12.5] },
              { a: 69, b: 437, c: "28C", coord: [-25, 15] },
              { a: 70, b: 438, c: "29C", coord: [-25, 17.5] },
              { a: 71, b: 439, c: "30C", coord: [-25, 20] },
              { a: 72, b: 440, c: "31C", coord: [-25, 22.5] },
              { a: 73, b: 441, c: "32C", coord: [-25, 25] },
              { a: 74, b: 442, c: "33C", coord: [-25, 27.5] },
              { a: 75, b: 531, c: "34C", coord: [-25, 30] }
            ],
            [
              { a: 76, b: 598, c: "10D", coord: [-22.5, -30] },
              { a: 77, b: 505, c: "11D", coord: [-22.5, -27.5] },
              { a: 78, b: 420, c: "12D", coord: [-22.5, -25] },
              { a: 79, b: 343, c: "13D", coord: [-22.5, -22.5] },
              { a: 80, b: 344, c: "14D", coord: [-22.5, -20] },
              { a: 81, b: 345, c: "15D", coord: [-22.5, -17.5] },
              { a: 82, b: 346, c: "16D", coord: [-22.5, -15] },
              { a: 83, b: 347, c: "17D", coord: [-22.5, -12.5] },
              { a: 84, b: 348, c: "18D", coord: [-22.5, -10] },
              { a: 85, b: 349, c: "19D", coord: [-22.5, -7.5] },
              { a: 86, b: 350, c: "20D", coord: [-22.5, -5] },
              { a: 87, b: 351, c: "21D", coord: [-22.5, -2.5] },
              { a: 88, b: 352, c: "22D", coord: [-22.5, 0] },
              { a: 89, b: 353, c: "23D", coord: [-22.5, 2.5] },
              { a: 90, b: 354, c: "24D", coord: [-22.5, 5] },
              { a: 91, b: 355, c: "25D", coord: [-22.5, 7.5] },
              { a: 92, b: 356, c: "26D", coord: [-22.5, 10] },
              { a: 93, b: 357, c: "27D", coord: [-22.5, 12.5] },
              { a: 94, b: 358, c: "28D", coord: [-22.5, 15] },
              { a: 95, b: 359, c: "29D", coord: [-22.5, 17.5] },
              { a: 96, b: 360, c: "30D", coord: [-22.5, 20] },
              { a: 97, b: 361, c: "31D", coord: [-22.5, 22.5] },
              { a: 98, b: 362, c: "32D", coord: [-22.5, 25] },
              { a: 99, b: 443, c: "33D", coord: [-22.5, 27.5] },
              { a: 100, b: 532, c: "34D", coord: [-22.5, 30] }
            ],
            [
              { a: 101, b: 597, c: "10E", coord: [-20, -30] },
              { a: 102, b: 504, c: "11E", coord: [-20, -27.5] },
              { a: 103, b: 419, c: "12E", coord: [-20, -25] },
              { a: 104, b: 342, c: "13E", coord: [-20, -22.5] },
              { a: 105, b: 273, c: "14E", coord: [-20, -20] },
              { a: 106, b: 274, c: "15E", coord: [-20, -17.5] },
              { a: 107, b: 275, c: "16E", coord: [-20, -15] },
              { a: 108, b: 276, c: "17E", coord: [-20, -12.5] },
              { a: 109, b: 277, c: "18E", coord: [-20, -10] },
              { a: 110, b: 278, c: "19E", coord: [-20, -7.5] },
              { a: 111, b: 279, c: "20E", coord: [-20, -5] },
              { a: 112, b: 280, c: "21E", coord: [-20, -2.5] },
              { a: 113, b: 281, c: "22E", coord: [-20, 0] },
              { a: 114, b: 282, c: "23E", coord: [-20, 2.5] },
              { a: 115, b: 283, c: "24E", coord: [-20, 5] },
              { a: 116, b: 284, c: "25E", coord: [-20, 7.5] },
              { a: 117, b: 285, c: "26E", coord: [-20, 10] },
              { a: 118, b: 286, c: "27E", coord: [-20, 12.5] },
              { a: 119, b: 287, c: "28E", coord: [-20, 15] },
              { a: 120, b: 288, c: "29E", coord: [-20, 17.5] },
              { a: 121, b: 289, c: "30E", coord: [-20, 20] },
              { a: 122, b: 290, c: "31E", coord: [-20, 22.5] },
              { a: 123, b: 363, c: "32E", coord: [-20, 25] },
              { a: 124, b: 444, c: "33E", coord: [-20, 27.5] },
              { a: 125, b: 533, c: "34E", coord: [-20, 30] }
            ],
            [
              { a: 126, b: 596, c: "10F", coord: [-17.5, -30] },
              { a: 127, b: 503, c: "11F", coord: [-17.5, -27.5] },
              { a: 128, b: 418, c: "12F", coord: [-17.5, -25] },
              { a: 129, b: 341, c: "13F", coord: [-17.5, -22.5] },
              { a: 130, b: 272, c: "14F", coord: [-17.5, -20] },
              { a: 131, b: 211, c: "15F", coord: [-17.5, -17.5] },
              { a: 132, b: 212, c: "16F", coord: [-17.5, -15] },
              { a: 133, b: 213, c: "17F", coord: [-17.5, -12.5] },
              { a: 134, b: 214, c: "18F", coord: [-17.5, -10] },
              { a: 135, b: 215, c: "19F", coord: [-17.5, -7.5] },
              { a: 136, b: 216, c: "20F", coord: [-17.5, -5] },
              { a: 137, b: 217, c: "21F", coord: [-17.5, -2.5] },
              { a: 138, b: 218, c: "22F", coord: [-17.5, 0] },
              { a: 139, b: 219, c: "23F", coord: [-17.5, 2.5] },
              { a: 140, b: 220, c: "24F", coord: [-17.5, 5] },
              { a: 141, b: 221, c: "25F", coord: [-17.5, 7.5] },
              { a: 142, b: 222, c: "26F", coord: [-17.5, 10] },
              { a: 143, b: 223, c: "27F", coord: [-17.5, 12.5] },
              { a: 144, b: 224, c: "28F", coord: [-17.5, 15] },
              { a: 145, b: 225, c: "29F", coord: [-17.5, 17.5] },
              { a: 146, b: 226, c: "30F", coord: [-17.5, 20] },
              { a: 147, b: 291, c: "31F", coord: [-17.5, 22.5] },
              { a: 148, b: 364, c: "32F", coord: [-17.5, 25] },
              { a: 149, b: 445, c: "33F", coord: [-17.5, 27.5] },
              { a: 150, b: 534, c: "34F", coord: [-17.5, 30] }
            ],
            [
              { a: 151, b: 595, c: "10G", coord: [-15, -30] },
              { a: 152, b: 502, c: "11G", coord: [-15, -27.5] },
              { a: 153, b: 417, c: "12G", coord: [-15, -25] },
              { a: 154, b: 340, c: "13G", coord: [-15, -22.5] },
              { a: 155, b: 271, c: "14G", coord: [-15, -20] },
              { a: 156, b: 210, c: "15G", coord: [-15, -17.5] },
              { a: 157, b: 157, c: "16G", coord: [-15, -15] },
              { a: 158, b: 158, c: "17G", coord: [-15, -12.5] },
              { a: 159, b: 159, c: "18G", coord: [-15, -10] },
              { a: 160, b: 160, c: "19G", coord: [-15, -7.5] },
              { a: 161, b: 161, c: "20G", coord: [-15, -5] },
              { a: 162, b: 162, c: "21G", coord: [-15, -2.5] },
              { a: 163, b: 163, c: "22G", coord: [-15, 0] },
              { a: 164, b: 164, c: "23G", coord: [-15, 2.5] },
              { a: 165, b: 165, c: "24G", coord: [-15, 5] },
              { a: 166, b: 166, c: "25G", coord: [-15, 7.5] },
              { a: 167, b: 167, c: "26G", coord: [-15, 10] },
              { a: 168, b: 168, c: "27G", coord: [-15, 12.5] },
              { a: 169, b: 169, c: "28G", coord: [-15, 15] },
              { a: 170, b: 170, c: "29G", coord: [-15, 17.5] },
              { a: 171, b: 227, c: "30G", coord: [-15, 20] },
              { a: 172, b: 292, c: "31G", coord: [-15, 22.5] },
              { a: 173, b: 365, c: "32G", coord: [-15, 25] },
              { a: 174, b: 446, c: "33G", coord: [-15, 27.5] },
              { a: 175, b: 535, c: "34G", coord: [-15, 30] }
            ],
            [
              { a: 176, b: 594, c: "10H", coord: [-12.5, -30] },
              { a: 177, b: 501, c: "11H", coord: [-12.5, -27.5] },
              { a: 178, b: 416, c: "12H", coord: [-12.5, -25] },
              { a: 179, b: 339, c: "13H", coord: [-12.5, -22.5] },
              { a: 180, b: 270, c: "14H", coord: [-12.5, -20] },
              { a: 181, b: 209, c: "15H", coord: [-12.5, -17.5] },
              { a: 182, b: 156, c: "16H", coord: [-12.5, -15] },
              { a: 183, b: 111, c: "17H", coord: [-12.5, -12.5] },
              { a: 184, b: 112, c: "18H", coord: [-12.5, -10] },
              { a: 185, b: 113, c: "19H", coord: [-12.5, -7.5] },
              { a: 186, b: 114, c: "20H", coord: [-12.5, -5] },
              { a: 187, b: 115, c: "21H", coord: [-12.5, -2.5] },
              { a: 188, b: 116, c: "22H", coord: [-12.5, 0] },
              { a: 189, b: 117, c: "23H", coord: [-12.5, 2.5] },
              { a: 190, b: 118, c: "24H", coord: [-12.5, 5] },
              { a: 191, b: 119, c: "25H", coord: [-12.5, 7.5] },
              { a: 192, b: 120, c: "26H", coord: [-12.5, 10] },
              { a: 193, b: 121, c: "27H", coord: [-12.5, 12.5] },
              { a: 194, b: 122, c: "28H", coord: [-12.5, 15] },
              { a: 195, b: 171, c: "29H", coord: [-12.5, 17.5] },
              { a: 196, b: 228, c: "30H", coord: [-12.5, 20] },
              { a: 197, b: 293, c: "31H", coord: [-12.5, 22.5] },
              { a: 198, b: 366, c: "32H", coord: [-12.5, 25] },
              { a: 199, b: 447, c: "33H", coord: [-12.5, 27.5] },
              { a: 200, b: 536, c: "34H", coord: [-12.5, 30] }
            ],
            [
              { a: 201, b: 593, c: "10I", coord: [-10, -30] },
              { a: 202, b: 500, c: "11I", coord: [-10, -27.5] },
              { a: 203, b: 415, c: "12I", coord: [-10, -25] },
              { a: 204, b: 338, c: "13I", coord: [-10, -22.5] },
              { a: 205, b: 269, c: "14I", coord: [-10, -20] },
              { a: 206, b: 208, c: "15I", coord: [-10, -17.5] },
              { a: 207, b: 155, c: "16I", coord: [-10, -15] },
              { a: 208, b: 110, c: "17I", coord: [-10, -12.5] },
              { a: 209, b: 73, c: "18I", coord: [-10, -10] },
              { a: 210, b: 74, c: "19I", coord: [-10, -7.5] },
              { a: 211, b: 75, c: "20I", coord: [-10, -5] },
              { a: 212, b: 76, c: "21I", coord: [-10, -2.5] },
              { a: 213, b: 77, c: "22I", coord: [-10, 0] },
              { a: 214, b: 78, c: "23I", coord: [-10, 2.5] },
              { a: 215, b: 79, c: "24I", coord: [-10, 5] },
              { a: 216, b: 80, c: "25I", coord: [-10, 7.5] },
              { a: 217, b: 81, c: "26I", coord: [-10, 10] },
              { a: 218, b: 82, c: "27I", coord: [-10, 12.5] },
              { a: 219, b: 123, c: "28I", coord: [-10, 15] },
              { a: 220, b: 172, c: "29I", coord: [-10, 17.5] },
              { a: 221, b: 229, c: "30I", coord: [-10, 20] },
              { a: 222, b: 294, c: "31I", coord: [-10, 22.5] },
              { a: 223, b: 367, c: "32I", coord: [-10, 25] },
              { a: 224, b: 448, c: "33I", coord: [-10, 27.5] },
              { a: 225, b: 537, c: "34I", coord: [-10, 30] }
            ],
            [
              { a: 226, b: 592, c: "10J", coord: [-7.5, -30] },
              { a: 227, b: 499, c: "11J", coord: [-7.5, -27.5] },
              { a: 228, b: 414, c: "12J", coord: [-7.5, -25] },
              { a: 229, b: 337, c: "13J", coord: [-7.5, -22.5] },
              { a: 230, b: 268, c: "14J", coord: [-7.5, -20] },
              { a: 231, b: 207, c: "15J", coord: [-7.5, -17.5] },
              { a: 232, b: 154, c: "16J", coord: [-7.5, -15] },
              { a: 233, b: 109, c: "17J", coord: [-7.5, -12.5] },
              { a: 234, b: 72, c: "18J", coord: [-7.5, -10] },
              { a: 235, b: 43, c: "19J", coord: [-7.5, -7.5] },
              { a: 236, b: 44, c: "20J", coord: [-7.5, -5] },
              { a: 237, b: 45, c: "21J", coord: [-7.5, -2.5] },
              { a: 238, b: 46, c: "22J", coord: [-7.5, 0] },
              { a: 239, b: 47, c: "23J", coord: [-7.5, 2.5] },
              { a: 240, b: 48, c: "24J", coord: [-7.5, 5] },
              { a: 241, b: 49, c: "25J", coord: [-7.5, 7.5] },
              { a: 242, b: 50, c: "26J", coord: [-7.5, 10] },
              { a: 243, b: 83, c: "27J", coord: [-7.5, 12.5] },
              { a: 244, b: 124, c: "28J", coord: [-7.5, 15] },
              { a: 245, b: 173, c: "29J", coord: [-7.5, 17.5] },
              { a: 246, b: 230, c: "30J", coord: [-7.5, 20] },
              { a: 247, b: 295, c: "31J", coord: [-7.5, 22.5] },
              { a: 248, b: 368, c: "32J", coord: [-7.5, 25] },
              { a: 249, b: 449, c: "33J", coord: [-7.5, 27.5] },
              { a: 250, b: 538, c: "34J", coord: [-7.5, 30] }
            ],
            [
              { a: 251, b: 591, c: "10K", coord: [-5, -30] },
              { a: 252, b: 498, c: "11K", coord: [-5, -27.5] },
              { a: 253, b: 413, c: "12K", coord: [-5, -25] },
              { a: 254, b: 336, c: "13K", coord: [-5, -22.5] },
              { a: 255, b: 267, c: "14K", coord: [-5, -20] },
              { a: 256, b: 206, c: "15K", coord: [-5, -17.5] },
              { a: 257, b: 153, c: "16K", coord: [-5, -15] },
              { a: 258, b: 108, c: "17K", coord: [-5, -12.5] },
              { a: 259, b: 71, c: "18K", coord: [-5, -10] },
              { a: 260, b: 42, c: "19K", coord: [-5, -7.5] },
              { a: 261, b: 21, c: "20K", coord: [-5, -5] },
              { a: 262, b: 22, c: "21K", coord: [-5, -2.5] },
              { a: 263, b: 23, c: "22K", coord: [-5, 0] },
              { a: 264, b: 24, c: "23K", coord: [-5, 2.5] },
              { a: 265, b: 25, c: "24K", coord: [-5, 5] },
              { a: 266, b: 26, c: "25K", coord: [-5, 7.5] },
              { a: 267, b: 51, c: "26K", coord: [-5, 10] },
              { a: 268, b: 84, c: "27K", coord: [-5, 12.5] },
              { a: 269, b: 125, c: "28K", coord: [-5, 15] },
              { a: 270, b: 174, c: "29K", coord: [-5, 17.5] },
              { a: 271, b: 231, c: "30K", coord: [-5, 20] },
              { a: 272, b: 296, c: "31K", coord: [-5, 22.5] },
              { a: 273, b: 369, c: "32K", coord: [-5, 25] },
              { a: 274, b: 450, c: "33K", coord: [-5, 27.5] },
              { a: 275, b: 539, c: "34K", coord: [-5, 30] }
            ],
            [
              { a: 276, b: 590, c: "10L", coord: [-2.5, -30] },
              { a: 277, b: 497, c: "11L", coord: [-2.5, -27.5] },
              { a: 278, b: 412, c: "12L", coord: [-2.5, -25] },
              { a: 279, b: 335, c: "13L", coord: [-2.5, -22.5] },
              { a: 280, b: 266, c: "14L", coord: [-2.5, -20] },
              { a: 281, b: 205, c: "15L", coord: [-2.5, -17.5] },
              { a: 282, b: 152, c: "16L", coord: [-2.5, -15] },
              { a: 283, b: 107, c: "17L", coord: [-2.5, -12.5] },
              { a: 284, b: 70, c: "18L", coord: [-2.5, -10] },
              { a: 285, b: 41, c: "19L", coord: [-2.5, -7.5] },
              { a: 286, b: 20, c: "20L", coord: [-2.5, -5] },
              { a: 287, b: 6, c: "21L", coord: [-2.5, -2.5] },
              { a: 288, b: 4, c: "22L", coord: [-2.5, 0] },
              { a: 289, b: 7, c: "23L", coord: [-2.5, 2.5] },
              { a: 290, b: 10, c: "24L", coord: [-2.5, 5] },
              { a: 291, b: 27, c: "25L", coord: [-2.5, 7.5] },
              { a: 292, b: 52, c: "26L", coord: [-2.5, 10] },
              { a: 293, b: 85, c: "27L", coord: [-2.5, 12.5] },
              { a: 294, b: 126, c: "28L", coord: [-2.5, 15] },
              { a: 295, b: 175, c: "29L", coord: [-2.5, 17.5] },
              { a: 296, b: 232, c: "30L", coord: [-2.5, 20] },
              { a: 297, b: 297, c: "31L", coord: [-2.5, 22.5] },
              { a: 298, b: 370, c: "32L", coord: [-2.5, 25] },
              { a: 299, b: 451, c: "33L", coord: [-2.5, 27.5] },
              { a: 300, b: 540, c: "3L4", coord: [-2.5, 30] }
            ],
            [
              { a: 301, b: 589, c: "10M", coord: [0, -30] },
              { a: 302, b: 496, c: "11M", coord: [0, -27.5] },
              { a: 303, b: 411, c: "12M", coord: [0, -25] },
              { a: 304, b: 334, c: "13M", coord: [0, -22.5] },
              { a: 305, b: 265, c: "14M", coord: [0, -20] },
              { a: 306, b: 204, c: "15M", coord: [0, -17.5] },
              { a: 307, b: 151, c: "16M", coord: [0, -15] },
              { a: 308, b: 106, c: "17M", coord: [0, -12.5] },
              { a: 309, b: 69, c: "18M", coord: [0, -10] },
              { a: 310, b: 40, c: "19M", coord: [0, -7.5] },
              { a: 311, b: 19, c: "20M", coord: [0, -5] },
              { a: 312, b: 3, c: "21M", coord: [0, -2.5] },
              { a: 313, b: 1, c: "22M", coord: [0, 0] },
              { a: 314, b: 2, c: "23M", coord: [0, 2.5] },
              { a: 315, b: 11, c: "24M", coord: [0, 5] },
              { a: 316, b: 28, c: "25M", coord: [0, 7.5] },
              { a: 317, b: 53, c: "26M", coord: [0, 10] },
              { a: 318, b: 86, c: "27M", coord: [0, 12.5] },
              { a: 319, b: 127, c: "28M", coord: [0, 15] },
              { a: 320, b: 176, c: "29M", coord: [0, 17.5] },
              { a: 321, b: 233, c: "30M", coord: [0, 20] },
              { a: 322, b: 298, c: "31M", coord: [0, 22.5] },
              { a: 323, b: 371, c: "32M", coord: [0, 25] },
              { a: 324, b: 452, c: "33M", coord: [0, 27.5] },
              { a: 325, b: 541, c: "34M", coord: [0, 30] }
            ],
            [
              { a: 326, b: 588, c: "10N", coord: [2.5, -30] },
              { a: 327, b: 495, c: "11N", coord: [2.5, -27.5] },
              { a: 328, b: 410, c: "12N", coord: [2.5, -25] },
              { a: 329, b: 333, c: "13N", coord: [2.5, -22.5] },
              { a: 330, b: 264, c: "14N", coord: [2.5, -20] },
              { a: 331, b: 203, c: "15N", coord: [2.5, -17.5] },
              { a: 332, b: 150, c: "16N", coord: [2.5, -15] },
              { a: 333, b: 105, c: "17N", coord: [2.5, -12.5] },
              { a: 334, b: 68, c: "18N", coord: [2.5, -10] },
              { a: 335, b: 39, c: "19N", coord: [2.5, -7.5] },
              { a: 336, b: 18, c: "20N", coord: [2.5, -5] },
              { a: 337, b: 8, c: "21N", coord: [2.5, -2.5] },
              { a: 338, b: 5, c: "22N", coord: [2.5, 0] },
              { a: 339, b: 9, c: "23N", coord: [2.5, 2.5] },
              { a: 340, b: 12, c: "24N", coord: [2.5, 5] },
              { a: 341, b: 29, c: "25N", coord: [2.5, 7.5] },
              { a: 342, b: 54, c: "26N", coord: [2.5, 10] },
              { a: 343, b: 87, c: "27N", coord: [2.5, 12.5] },
              { a: 344, b: 128, c: "28N", coord: [2.5, 15] },
              { a: 345, b: 177, c: "29N", coord: [2.5, 17.5] },
              { a: 346, b: 234, c: "30N", coord: [2.5, 20] },
              { a: 347, b: 299, c: "31N", coord: [2.5, 22.5] },
              { a: 348, b: 372, c: "32N", coord: [2.5, 25] },
              { a: 349, b: 453, c: "33N", coord: [2.5, 27.5] },
              { a: 350, b: 542, c: "34N", coord: [2.5, 30] }
            ],
            [
              { a: 351, b: 587, c: "10O", coord: [5, -30] },
              { a: 352, b: 494, c: "11O", coord: [5, -27.5] },
              { a: 353, b: 409, c: "12O", coord: [5, -25] },
              { a: 354, b: 332, c: "13O", coord: [5, -22.5] },
              { a: 355, b: 263, c: "14O", coord: [5, -20] },
              { a: 356, b: 202, c: "15O", coord: [5, -17.5] },
              { a: 357, b: 149, c: "16O", coord: [5, -15] },
              { a: 358, b: 104, c: "17O", coord: [5, -12.5] },
              { a: 359, b: 67, c: "18O", coord: [5, -10] },
              { a: 360, b: 38, c: "19O", coord: [5, -7.5] },
              { a: 361, b: 17, c: "20O", coord: [5, -5] },
              { a: 362, b: 16, c: "21O", coord: [5, -2.5] },
              { a: 363, b: 15, c: "22O", coord: [5, 0] },
              { a: 364, b: 14, c: "23O", coord: [5, 2.5] },
              { a: 365, b: 13, c: "24O", coord: [5, 5] },
              { a: 366, b: 30, c: "25O", coord: [5, 7.5] },
              { a: 367, b: 55, c: "26O", coord: [5, 10] },
              { a: 368, b: 88, c: "27O", coord: [5, 12.5] },
              { a: 369, b: 129, c: "28O", coord: [5, 15] },
              { a: 370, b: 178, c: "29O", coord: [5, 17.5] },
              { a: 371, b: 235, c: "30O", coord: [5, 20] },
              { a: 372, b: 300, c: "31O", coord: [5, 22.5] },
              { a: 373, b: 373, c: "32O", coord: [5, 25] },
              { a: 374, b: 454, c: "33O", coord: [5, 27.5] },
              { a: 375, b: 543, c: "34O", coord: [5, 30] }
            ],
            [
              { a: 376, b: 586, c: "10P", coord: [7.5, -30] },
              { a: 377, b: 493, c: "11P", coord: [7.5, -27.5] },
              { a: 378, b: 408, c: "12P", coord: [7.5, -25] },
              { a: 379, b: 331, c: "13P", coord: [7.5, -22.5] },
              { a: 380, b: 262, c: "14P", coord: [7.5, -20] },
              { a: 381, b: 201, c: "15P", coord: [7.5, -17.5] },
              { a: 382, b: 148, c: "16P", coord: [7.5, -15] },
              { a: 383, b: 103, c: "17P", coord: [7.5, -12.5] },
              { a: 384, b: 66, c: "18P", coord: [7.5, -10] },
              { a: 385, b: 37, c: "19P", coord: [7.5, -7.5] },
              { a: 386, b: 36, c: "20P", coord: [7.5, -5] },
              { a: 387, b: 35, c: "21P", coord: [7.5, -2.5] },
              { a: 388, b: 34, c: "22P", coord: [7.5, 0] },
              { a: 389, b: 33, c: "23P", coord: [7.5, 2.5] },
              { a: 390, b: 32, c: "24P", coord: [7.5, 5] },
              { a: 391, b: 31, c: "25P", coord: [7.5, 7.5] },
              { a: 392, b: 56, c: "26P", coord: [7.5, 10] },
              { a: 393, b: 89, c: "27P", coord: [7.5, 12.5] },
              { a: 394, b: 130, c: "28P", coord: [7.5, 15] },
              { a: 395, b: 179, c: "29P", coord: [7.5, 17.5] },
              { a: 396, b: 236, c: "30P", coord: [7.5, 20] },
              { a: 397, b: 301, c: "31P", coord: [7.5, 22.5] },
              { a: 398, b: 374, c: "32P", coord: [7.5, 25] },
              { a: 399, b: 455, c: "33P", coord: [7.5, 27.5] },
              { a: 400, b: 544, c: "34P", coord: [7.5, 30] }
            ],
            [
              { a: 401, b: 585, c: "10Q", coord: [10, -30] },
              { a: 402, b: 492, c: "11Q", coord: [10, -27.5] },
              { a: 403, b: 407, c: "12Q", coord: [10, -25] },
              { a: 404, b: 330, c: "13Q", coord: [10, -22.5] },
              { a: 405, b: 261, c: "14Q", coord: [10, -20] },
              { a: 406, b: 200, c: "15Q", coord: [10, -17.5] },
              { a: 407, b: 147, c: "16Q", coord: [10, -15] },
              { a: 408, b: 102, c: "17Q", coord: [10, -12.5] },
              { a: 409, b: 65, c: "18Q", coord: [10, -10] },
              { a: 410, b: 64, c: "19Q", coord: [10, -7.5] },
              { a: 411, b: 63, c: "20Q", coord: [10, -5] },
              { a: 412, b: 62, c: "21Q", coord: [10, -2.5] },
              { a: 413, b: 61, c: "22Q", coord: [10, 0] },
              { a: 414, b: 60, c: "23Q", coord: [10, 2.5] },
              { a: 415, b: 59, c: "24Q", coord: [10, 5] },
              { a: 416, b: 58, c: "25Q", coord: [10, 7.5] },
              { a: 417, b: 57, c: "26Q", coord: [10, 10] },
              { a: 418, b: 90, c: "27Q", coord: [10, 12.5] },
              { a: 419, b: 131, c: "28Q", coord: [10, 15] },
              { a: 420, b: 180, c: "29Q", coord: [10, 17.5] },
              { a: 421, b: 237, c: "30Q", coord: [10, 20] },
              { a: 422, b: 302, c: "31Q", coord: [10, 22.5] },
              { a: 423, b: 375, c: "32Q", coord: [10, 25] },
              { a: 424, b: 456, c: "33Q", coord: [10, 27.5] },
              { a: 425, b: 545, c: "34Q", coord: [10, 30] }
            ],
            [
              { a: 426, b: 584, c: "10R", coord: [12.5, -30] },
              { a: 427, b: 491, c: "11R", coord: [12.5, -27.5] },
              { a: 428, b: 406, c: "12R", coord: [12.5, -25] },
              { a: 429, b: 329, c: "13R", coord: [12.5, -22.5] },
              { a: 430, b: 260, c: "14R", coord: [12.5, -20] },
              { a: 431, b: 199, c: "15R", coord: [12.5, -17.5] },
              { a: 432, b: 146, c: "16R", coord: [12.5, -15] },
              { a: 433, b: 101, c: "17R", coord: [12.5, -12.5] },
              { a: 434, b: 100, c: "18R", coord: [12.5, -10] },
              { a: 435, b: 99, c: "19R", coord: [12.5, -7.5] },
              { a: 436, b: 98, c: "20R", coord: [12.5, -5] },
              { a: 437, b: 97, c: "21R", coord: [12.5, -2.5] },
              { a: 438, b: 96, c: "22R", coord: [12.5, 0] },
              { a: 439, b: 95, c: "23R", coord: [12.5, 2.5] },
              { a: 440, b: 94, c: "24R", coord: [12.5, 5] },
              { a: 441, b: 93, c: "25R", coord: [12.5, 7.5] },
              { a: 442, b: 92, c: "26R", coord: [12.5, 10] },
              { a: 443, b: 91, c: "27R", coord: [12.5, 12.5] },
              { a: 444, b: 132, c: "28R", coord: [12.5, 15] },
              { a: 445, b: 181, c: "29R", coord: [12.5, 17.5] },
              { a: 446, b: 238, c: "30R", coord: [12.5, 20] },
              { a: 447, b: 303, c: "31R", coord: [12.5, 22.5] },
              { a: 448, b: 376, c: "32R", coord: [12.5, 25] },
              { a: 449, b: 457, c: "33R", coord: [12.5, 27.5] },
              { a: 450, b: 546, c: "34R", coord: [12.5, 30] }
            ],
            [
              { a: 451, b: 583, c: "10S", coord: [15, -30] },
              { a: 452, b: 490, c: "11S", coord: [15, -27.5] },
              { a: 453, b: 405, c: "12S", coord: [15, -25] },
              { a: 454, b: 328, c: "13S", coord: [15, -22.5] },
              { a: 455, b: 259, c: "14S", coord: [15, -20] },
              { a: 456, b: 198, c: "15S", coord: [15, -17.5] },
              { a: 457, b: 145, c: "16S", coord: [15, -15] },
              { a: 458, b: 144, c: "17S", coord: [15, -12.5] },
              { a: 459, b: 143, c: "18S", coord: [15, -10] },
              { a: 460, b: 142, c: "19S", coord: [15, -7.5] },
              { a: 461, b: 141, c: "20S", coord: [15, -5] },
              { a: 462, b: 140, c: "21S", coord: [15, -2.5] },
              { a: 463, b: 139, c: "22S", coord: [15, 0] },
              { a: 464, b: 138, c: "23S", coord: [15, 2.5] },
              { a: 465, b: 137, c: "24S", coord: [15, 5] },
              { a: 466, b: 136, c: "25S", coord: [15, 7.5] },
              { a: 467, b: 135, c: "26S", coord: [15, 10] },
              { a: 468, b: 134, c: "27S", coord: [15, 12.5] },
              { a: 469, b: 133, c: "28S", coord: [15, 15] },
              { a: 470, b: 182, c: "29S", coord: [15, 17.5] },
              { a: 471, b: 239, c: "30S", coord: [15, 20] },
              { a: 472, b: 304, c: "31S", coord: [15, 22.5] },
              { a: 473, b: 377, c: "32S", coord: [15, 25] },
              { a: 474, b: 458, c: "33S", coord: [15, 27.5] },
              { a: 475, b: 547, c: "34S", coord: [15, 30] }
            ],
            [
              { a: 476, b: 582, c: "10T", coord: [17.5, -30] },
              { a: 477, b: 489, c: "11T", coord: [17.5, -27.5] },
              { a: 478, b: 404, c: "12T", coord: [17.5, -25] },
              { a: 479, b: 327, c: "13T", coord: [17.5, -22.5] },
              { a: 480, b: 258, c: "14T", coord: [17.5, -20] },
              { a: 481, b: 197, c: "15T", coord: [17.5, -17.5] },
              { a: 482, b: 196, c: "16T", coord: [17.5, -15] },
              { a: 483, b: 195, c: "17T", coord: [17.5, -12.5] },
              { a: 484, b: 194, c: "18T", coord: [17.5, -10] },
              { a: 485, b: 193, c: "19T", coord: [17.5, -7.5] },
              { a: 486, b: 192, c: "20T", coord: [17.5, -5] },
              { a: 487, b: 191, c: "21T", coord: [17.5, -2.5] },
              { a: 488, b: 190, c: "22T", coord: [17.5, 0] },
              { a: 489, b: 189, c: "23T", coord: [17.5, 2.5] },
              { a: 490, b: 188, c: "24T", coord: [17.5, 5] },
              { a: 491, b: 187, c: "25T", coord: [17.5, 7.5] },
              { a: 492, b: 186, c: "26T", coord: [17.5, 10] },
              { a: 493, b: 185, c: "27T", coord: [17.5, 12.5] },
              { a: 494, b: 184, c: "28T", coord: [17.5, 15] },
              { a: 495, b: 183, c: "29T", coord: [17.5, 17.5] },
              { a: 496, b: 240, c: "30T", coord: [17.5, 20] },
              { a: 497, b: 305, c: "31T", coord: [17.5, 22.5] },
              { a: 498, b: 378, c: "32T", coord: [17.5, 25] },
              { a: 499, b: 459, c: "33T", coord: [17.5, 27.5] },
              { a: 500, b: 548, c: "34T", coord: [17.5, 30] }
            ],
            [
              { a: 501, b: 581, c: "10U", coord: [20, -30] },
              { a: 502, b: 488, c: "11U", coord: [20, -27.5] },
              { a: 503, b: 403, c: "12U", coord: [20, -25] },
              { a: 504, b: 326, c: "13U", coord: [20, -22.5] },
              { a: 505, b: 257, c: "14U", coord: [20, -20] },
              { a: 506, b: 256, c: "15U", coord: [20, -17.5] },
              { a: 507, b: 255, c: "16U", coord: [20, -15] },
              { a: 508, b: 254, c: "17U", coord: [20, -12.5] },
              { a: 509, b: 253, c: "18U", coord: [20, -10] },
              { a: 510, b: 252, c: "19U", coord: [20, -7.5] },
              { a: 511, b: 251, c: "20U", coord: [20, -5] },
              { a: 512, b: 250, c: "21U", coord: [20, -2.5] },
              { a: 513, b: 249, c: "22U", coord: [20, 0] },
              { a: 514, b: 248, c: "23U", coord: [20, 2.5] },
              { a: 515, b: 247, c: "24U", coord: [20, 5] },
              { a: 516, b: 246, c: "25U", coord: [20, 7.5] },
              { a: 517, b: 245, c: "26U", coord: [20, 10] },
              { a: 518, b: 244, c: "27U", coord: [20, 12.5] },
              { a: 519, b: 243, c: "28U", coord: [20, 15] },
              { a: 520, b: 242, c: "29U", coord: [20, 17.5] },
              { a: 521, b: 241, c: "30U", coord: [20, 20] },
              { a: 522, b: 306, c: "31U", coord: [20, 22.5] },
              { a: 523, b: 379, c: "32U", coord: [20, 25] },
              { a: 524, b: 460, c: "33U", coord: [20, 27.5] },
              { a: 525, b: 549, c: "34U", coord: [20, 30] }
            ],
            [
              { a: 526, b: 580, c: "10V", coord: [22.5, -30] },
              { a: 527, b: 487, c: "11V", coord: [22.5, -27.5] },
              { a: 528, b: 402, c: "12V", coord: [22.5, -25] },
              { a: 529, b: 325, c: "13V", coord: [22.5, -22.5] },
              { a: 530, b: 324, c: "14V", coord: [22.5, -20] },
              { a: 531, b: 323, c: "15V", coord: [22.5, -17.5] },
              { a: 532, b: 322, c: "16V", coord: [22.5, -15] },
              { a: 533, b: 321, c: "17V", coord: [22.5, -12.5] },
              { a: 534, b: 320, c: "18V", coord: [22.5, -10] },
              { a: 535, b: 319, c: "19V", coord: [22.5, -7.5] },
              { a: 536, b: 318, c: "20V", coord: [22.5, -5] },
              { a: 537, b: 317, c: "21V", coord: [22.5, -2.5] },
              { a: 538, b: 316, c: "22V", coord: [22.5, 0] },
              { a: 539, b: 315, c: "23V", coord: [22.5, 2.5] },
              { a: 540, b: 314, c: "24V", coord: [22.5, 5] },
              { a: 541, b: 313, c: "25V", coord: [22.5, 7.5] },
              { a: 542, b: 312, c: "26V", coord: [22.5, 10] },
              { a: 543, b: 311, c: "27V", coord: [22.5, 12.5] },
              { a: 544, b: 310, c: "28V", coord: [22.5, 15] },
              { a: 545, b: 309, c: "29V", coord: [22.5, 17.5] },
              { a: 546, b: 308, c: "30V", coord: [22.5, 20] },
              { a: 547, b: 307, c: "31V", coord: [22.5, 22.5] },
              { a: 548, b: 380, c: "32V", coord: [22.5, 25] },
              { a: 549, b: 461, c: "33V", coord: [22.5, 27.5] },
              { a: 550, b: 550, c: "34V", coord: [22.5, 30] }
            ],
            [
              { a: 551, b: 579, c: "10W", coord: [25, -30] },
              { a: 552, b: 486, c: "11W", coord: [25, -27.5] },
              { a: 553, b: 401, c: "12W", coord: [25, -25] },
              { a: 554, b: 400, c: "13W", coord: [25, -22.5] },
              { a: 555, b: 399, c: "14W", coord: [25, -20] },
              { a: 556, b: 398, c: "15W", coord: [25, -17.5] },
              { a: 557, b: 397, c: "16W", coord: [25, -15] },
              { a: 558, b: 396, c: "17W", coord: [25, -12.5] },
              { a: 559, b: 395, c: "18W", coord: [25, -10] },
              { a: 560, b: 394, c: "19W", coord: [25, -7.5] },
              { a: 561, b: 393, c: "20W", coord: [25, -5] },
              { a: 562, b: 392, c: "21W", coord: [25, -2.5] },
              { a: 563, b: 391, c: "22W", coord: [25, 0] },
              { a: 564, b: 390, c: "23W", coord: [25, 2.5] },
              { a: 565, b: 389, c: "24W", coord: [25, 5] },
              { a: 566, b: 388, c: "25W", coord: [25, 7.5] },
              { a: 567, b: 387, c: "26W", coord: [25, 10] },
              { a: 568, b: 386, c: "27W", coord: [25, 12.5] },
              { a: 569, b: 385, c: "28W", coord: [25, 15] },
              { a: 570, b: 384, c: "29W", coord: [25, 17.5] },
              { a: 571, b: 383, c: "30W", coord: [25, 20] },
              { a: 572, b: 382, c: "31W", coord: [25, 22.5] },
              { a: 573, b: 381, c: "32W", coord: [25, 25] },
              { a: 574, b: 462, c: "33W", coord: [25, 27.5] },
              { a: 575, b: 551, c: "34W", coord: [25, 30] }
            ],
            [
              { a: 576, b: 578, c: "10X", coord: [27.5, -30] },
              { a: 577, b: 485, c: "11X", coord: [27.5, -27.5] },
              { a: 578, b: 484, c: "12X", coord: [27.5, -25] },
              { a: 579, b: 483, c: "13X", coord: [27.5, -22.5] },
              { a: 580, b: 482, c: "14X", coord: [27.5, -20] },
              { a: 581, b: 481, c: "15X", coord: [27.5, -17.5] },
              { a: 582, b: 480, c: "16X", coord: [27.5, -15] },
              { a: 583, b: 479, c: "17X", coord: [27.5, -12.5] },
              { a: 584, b: 478, c: "18X", coord: [27.5, -10] },
              { a: 585, b: 477, c: "19X", coord: [27.5, -7.5] },
              { a: 586, b: 476, c: "20X", coord: [27.5, -5] },
              { a: 587, b: 475, c: "21X", coord: [27.5, -2.5] },
              { a: 588, b: 474, c: "22X", coord: [27.5, 0] },
              { a: 589, b: 473, c: "23X", coord: [27.5, 2.5] },
              { a: 590, b: 472, c: "24X", coord: [27.5, 5] },
              { a: 591, b: 471, c: "25X", coord: [27.5, 7.5] },
              { a: 592, b: 470, c: "26X", coord: [27.5, 10] },
              { a: 593, b: 469, c: "27X", coord: [27.5, 12.5] },
              { a: 594, b: 468, c: "28X", coord: [27.5, 15] },
              { a: 595, b: 467, c: "29X", coord: [27.5, 17.5] },
              { a: 596, b: 466, c: "30X", coord: [27.5, 20] },
              { a: 597, b: 465, c: "31X", coord: [27.5, 22.5] },
              { a: 598, b: 464, c: "32X", coord: [27.5, 25] },
              { a: 599, b: 463, c: "33X", coord: [27.5, 27.5] },
              { a: 600, b: 552, c: "34X", coord: [27.5, 30] }
            ],
            [
              { a: 601, b: 577, c: "10Y", coord: [30, -30] },
              { a: 602, b: 576, c: "11Y", coord: [30, -27.5] },
              { a: 603, b: 575, c: "12Y", coord: [30, -25] },
              { a: 604, b: 574, c: "13Y", coord: [30, -22.5] },
              { a: 605, b: 573, c: "14Y", coord: [30, -20] },
              { a: 606, b: 572, c: "15Y", coord: [30, -17.5] },
              { a: 607, b: 571, c: "16Y", coord: [30, -15] },
              { a: 608, b: 570, c: "17Y", coord: [30, -12.5] },
              { a: 609, b: 569, c: "18Y", coord: [30, -10] },
              { a: 610, b: 568, c: "19Y", coord: [30, -7.5] },
              { a: 611, b: 567, c: "20Y", coord: [30, -5] },
              { a: 612, b: 566, c: "21Y", coord: [30, -2.5] },
              { a: 613, b: 565, c: "22Y", coord: [30, 0] },
              { a: 614, b: 564, c: "23Y", coord: [30, 2.5] },
              { a: 615, b: 563, c: "24Y", coord: [30, 5] },
              { a: 616, b: 562, c: "25Y", coord: [30, 7.5] },
              { a: 617, b: 561, c: "26Y", coord: [30, 10] },
              { a: 618, b: 560, c: "27Y", coord: [30, 12.5] },
              { a: 619, b: 559, c: "28Y", coord: [30, 15] },
              { a: 620, b: 558, c: "29Y", coord: [30, 17.5] },
              { a: 621, b: 557, c: "30Y", coord: [30, 20] },
              { a: 622, b: 556, c: "31Y", coord: [30, 22.5] },
              { a: 623, b: 555, c: "32Y", coord: [30, 25] },
              { a: 624, b: 554, c: "33Y", coord: [30, 27.5] },
              { a: 625, b: 553, c: "34Y", coord: [30, 30] }
            ]
          ],
          currentPlots: 625
        }
      ];

      // generate city function
      function generateCity(city) {
        console.log(
          "generating `" + city.name + "` with " + city.currentPlots + " plots."
        );

        // ######################
        // ######## CITY ########
        // ######################

        // create and add city object3D
        const cityObject = new THREE.Object3D();
        scene.add(cityObject);
        objects.push(cityObject);

        // set city limits (if x buildings, city limits is [x,x])
        let cityLimits = [0, 0];
        let groundOffset = [0, 0, 0];

        if (city.currentPlots === 0) {
          console.log(
            "error: cannot generate city limits, no plots currently in city"
          );
        }
        if (city.currentPlots === 1) {
          cityLimits = [3, 3];
        }
        if (city.currentPlots === 2) {
          cityLimits = [3, 5.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots === 3) {
          cityLimits = [3, 8];
        }
        if (city.currentPlots === 4) {
          cityLimits = [5.5, 8];
          groundOffset = [-1.25, 0, 0];
        }
        if (city.currentPlots >= 5 && city.currentPlots <= 9) {
          cityLimits = [8, 8];
        }
        if (city.currentPlots >= 10 && city.currentPlots <= 12) {
          cityLimits = [8, 10.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 13 && city.currentPlots <= 16) {
          cityLimits = [10.5, 10.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 17 && city.currentPlots <= 20) {
          cityLimits = [10.5, 13];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 21 && city.currentPlots <= 25) {
          cityLimits = [13, 13];
        }
        if (city.currentPlots >= 26 && city.currentPlots <= 30) {
          cityLimits = [13, 15.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 31 && city.currentPlots <= 36) {
          cityLimits = [15.5, 15.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 37 && city.currentPlots <= 42) {
          cityLimits = [15.5, 18];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 43 && city.currentPlots <= 49) {
          cityLimits = [18, 18];
        }
        if (city.currentPlots >= 50 && city.currentPlots <= 56) {
          cityLimits = [18, 20.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 57 && city.currentPlots <= 64) {
          cityLimits = [20.5, 20.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 65 && city.currentPlots <= 72) {
          cityLimits = [20.5, 23];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 73 && city.currentPlots <= 81) {
          cityLimits = [23, 23];
        }
        if (city.currentPlots >= 82 && city.currentPlots <= 90) {
          cityLimits = [23, 25.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 91 && city.currentPlots <= 100) {
          cityLimits = [25.5, 25.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 101 && city.currentPlots <= 110) {
          cityLimits = [25.5, 28];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 111 && city.currentPlots <= 121) {
          cityLimits = [28, 28];
        }
        if (city.currentPlots >= 122 && city.currentPlots <= 132) {
          cityLimits = [28, 30.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 133 && city.currentPlots <= 144) {
          cityLimits = [30.5, 30.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 145 && city.currentPlots <= 156) {
          cityLimits = [30.5, 33];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 157 && city.currentPlots <= 169) {
          cityLimits = [33, 33];
        }
        if (city.currentPlots >= 170 && city.currentPlots <= 182) {
          cityLimits = [33, 35.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 183 && city.currentPlots <= 196) {
          cityLimits = [35.5, 35.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 197 && city.currentPlots <= 210) {
          cityLimits = [35.5, 38];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 211 && city.currentPlots <= 225) {
          cityLimits = [38, 38];
        }
        if (city.currentPlots >= 226 && city.currentPlots <= 240) {
          cityLimits = [38, 40.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 241 && city.currentPlots <= 356) {
          cityLimits = [40.5, 40.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 257 && city.currentPlots <= 272) {
          cityLimits = [40.5, 43];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 273 && city.currentPlots <= 289) {
          cityLimits = [43, 43];
          groundOffset = [0, 0, 0];
        }
        if (city.currentPlots >= 290 && city.currentPlots <= 306) {
          cityLimits = [43, 45.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 307 && city.currentPlots <= 324) {
          cityLimits = [45.5, 45.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 325 && city.currentPlots <= 342) {
          cityLimits = [45.5, 48];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 343 && city.currentPlots <= 361) {
          cityLimits = [48, 48];
        }
        if (city.currentPlots >= 362 && city.currentPlots <= 380) {
          cityLimits = [48, 50.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 381 && city.currentPlots <= 400) {
          cityLimits = [50.5, 50.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 401 && city.currentPlots <= 420) {
          cityLimits = [50.5, 53];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 421 && city.currentPlots <= 441) {
          cityLimits = [53, 53];
        }
        if (city.currentPlots >= 442 && city.currentPlots <= 462) {
          cityLimits = [53, 55.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 463 && city.currentPlots <= 484) {
          cityLimits = [55.5, 55.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 485 && city.currentPlots <= 506) {
          cityLimits = [55.5, 58];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 507 && city.currentPlots <= 529) {
          cityLimits = [58, 58];
        }
        if (city.currentPlots >= 530 && city.currentPlots <= 552) {
          cityLimits = [58, 60.5];
          groundOffset = [0, 0, 1.25];
        }
        if (city.currentPlots >= 553 && city.currentPlots <= 576) {
          cityLimits = [60.5, 60.5];
          groundOffset = [1.25, 0, 1.25];
        }
        if (city.currentPlots >= 577 && city.currentPlots <= 600) {
          cityLimits = [60.5, 63];
          groundOffset = [1.25, 0, 0];
        }
        if (city.currentPlots >= 601 && city.currentPlots <= 625) {
          cityLimits = [63, 63];
        }
        console.log(
          "city limits set to " + cityLimits[0] + " by " + cityLimits[1]
        );

        // create city ground
        // geometry (with city limits)
        const cityGroundGeometry = new THREE.PlaneBufferGeometry(
          cityLimits[0],
          cityLimits[1],
          0
        );
        // material
        const cityGroundMaterial = new THREE.MeshPhongMaterial({
          color: 0xedf5f2,
          opacity: 0,
          transparent: true
        });
        // mesh
        const cityGroundMesh = new THREE.Mesh(
          cityGroundGeometry,
          cityGroundMaterial
        );

        // set city ground position and rotation
        cityGroundMesh.position.set(
          groundOffset[0],
          groundOffset[1],
          groundOffset[2]
        );
        cityGroundMesh.rotation.set(-1.5707963, 0, 0);

        // add city to city object3D and objects array
        cityObject.add(cityGroundMesh);
        objects.push(cityGroundMesh);

        // ######################
        // ######## PLOTS #######
        // ######################

        // create and add plots object3D to city
        const plotsObject = new THREE.Object3D();
        cityObject.add(plotsObject);
        objects.push(plotsObject);

        // create plot ground geometry and material
        // geometry
        const plotGroundGeometry = new THREE.PlaneBufferGeometry(2, 2, 0);
        // material
        const plotGroundMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });

        // create building geometries and materials
        // 1 story geometry
        const oneStoryGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
        // 1 story material
        const oneStoryMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });
        // 2 story geometry
        const twoStoryGeometry = new THREE.BoxBufferGeometry(1, 2, 1);
        // 2 story material
        const twoStoryMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });
        // 3 story geometry
        const threeStoryGeometry = new THREE.BoxBufferGeometry(1, 3, 1);
        // 3 story material
        const threeStoryMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });
        // 4 story geometry
        const fourStoryGeometry = new THREE.BoxBufferGeometry(1, 4, 1);
        // 4 story material
        const fourStoryMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });
        // 5 story geometry
        const fiveStoryGeometry = new THREE.BoxBufferGeometry(1, 5, 1);
        // 5 story material
        const fiveStoryMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });
        // 6 story geometry
        const sixStoryGeometry = new THREE.BoxBufferGeometry(1, 6, 1);
        // 6 story material
        const sixStoryMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });
        // 7 story geometry
        const sevenStoryGeometry = new THREE.BoxBufferGeometry(1, 7, 1);
        // 7 story material
        const sevenStoryMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });
        // 8 story geometry
        const eightStoryGeometry = new THREE.BoxBufferGeometry(1, 8, 1);
        // 8 story material
        const eightStoryMaterial = new THREE.MeshPhongMaterial({
          color: 0x8ebfad
        });

        // init plots holding array
        let plotsHolder = [];

        // for each plot in blueprint, create a plot object and ground mesh, and add to plots holding array
        for (let i = 0; i < city.currentPlots; i++) {
          for (let j = 0; j < city.blueprint.length; j++) {
            for (let k = 0; k < city.blueprint[j].length; k++) {
              // console.log('current plot: ' +i +'\n' +'current row: ' +j +'\n' +'current plot: ' +k);

              // console.log(city.blueprint[j][k]);

              if (city.blueprint[j][k].b === i + 1) {
                console.log(
                  "adding plot" +
                    "\n" +
                    "a: " +
                    city.blueprint[j][k].a +
                    "\n" +
                    "b: " +
                    city.blueprint[j][k].b +
                    "\n" +
                    "c: " +
                    city.blueprint[j][k].c
                );

                // create a plot object and position with blueprint coordinates
                const plotObject = new THREE.Object3D();
                plotObject.position.x = city.blueprint[j][k].coord[0];
                plotObject.position.y = 0.01;
                plotObject.position.z = city.blueprint[j][k].coord[1];

                // create a ground mesh and add to the plot object
                const plotGroundMesh = new THREE.Mesh(
                  plotGroundGeometry,
                  plotGroundMaterial
                );
                plotGroundMesh.rotation.set(-1.5707963, 0, 0);
                plotObject.add(plotGroundMesh);

                // create a random sized building mesh and add to the plot object
                let rando = Math.floor(Math.random() * 3) + 1;
                let oneStoryMesh,
                  twoStoryMesh,
                  threeStoryMesh,
                  fourStoryMesh,
                  fiveStoryMesh,
                  sixStoryMesh,
                  sevenStoryMesh,
                  eightStoryMesh;
                switch (rando) {
                  case 1:
                    oneStoryMesh = new THREE.Mesh(
                      oneStoryGeometry,
                      oneStoryMaterial
                    );
                    oneStoryMesh.position.set(0, 0.5, 0);
                    plotObject.add(oneStoryMesh);
                    break;
                  case 2:
                    twoStoryMesh = new THREE.Mesh(
                      twoStoryGeometry,
                      twoStoryMaterial
                    );
                    twoStoryMesh.position.set(0, 1, 0);
                    plotObject.add(twoStoryMesh);
                    break;
                  case 3:
                    threeStoryMesh = new THREE.Mesh(
                      threeStoryGeometry,
                      threeStoryMaterial
                    );
                    threeStoryMesh.position.set(0, 1.5, 0);
                    plotObject.add(threeStoryMesh);
                    break;
                  case 4:
                    fourStoryMesh = new THREE.Mesh(
                      fourStoryGeometry,
                      fourStoryMaterial
                    );
                    fourStoryMesh.position.set(0, 2, 0);
                    plotObject.add(fourStoryMesh);
                    break;
                  case 5:
                    fiveStoryMesh = new THREE.Mesh(
                      fiveStoryGeometry,
                      fiveStoryMaterial
                    );
                    fiveStoryMesh.position.set(0, 2.5, 0);
                    plotObject.add(fiveStoryMesh);
                    break;
                  case 6:
                    sixStoryMesh = new THREE.Mesh(
                      sixStoryGeometry,
                      sixStoryMaterial
                    );
                    sixStoryMesh.position.set(0, 3, 0);
                    plotObject.add(sixStoryMesh);
                    break;
                  case 7:
                    sevenStoryMesh = new THREE.Mesh(
                      sevenStoryGeometry,
                      sevenStoryMaterial
                    );
                    sevenStoryMesh.position.set(0, 3.5, 0);
                    plotObject.add(sevenStoryMesh);
                    break;
                  case 8:
                    eightStoryMesh = new THREE.Mesh(
                      eightStoryGeometry,
                      eightStoryMaterial
                    );
                    eightStoryMesh.position.set(0, 4, 0);
                    plotObject.add(eightStoryMesh);
                    break;
                  default:
                    console.log("error: building size outside of bounds");
                }

                // add plot object to the plots holding array
                plotsHolder.push(plotObject);
              }
            }
          }
        }

        // for every plot in the plots holding array, push plot to the plots object
        for (let i = 0; i < plotsHolder.length; i++) {
          plotsObject.add(plotsHolder[i]);
        }

        // ######################
        // ######## ROADS #######
        // ######################

        // create and add city object3D
        const roadsObject = new THREE.Object3D();
        cityObject.add(roadsObject);
        objects.push(roadsObject);

        // ######################
        // ######## SIGNS #######
        // ######################

        // create and add city object3D
        const signsObject = new THREE.Object3D();
        cityObject.add(signsObject);
        objects.push(signsObject);

        console.log(city.name + " generated");
      }

      // generate first city
      generateCity(cities[0]);

      // function to resize canvas to css/element size
      function resizeRendererToDisplaySize(renderer) {
        const thisCanvas = renderer.domElement;
        // uncomment for pixel multiplication for HD-DPI screens
        // const pixelRatio = window.devicePixelRatio;
        const width = thisCanvas.clientWidth;
        const height = thisCanvas.clientHeight;
        const needResize =
          thisCanvas.width !== width || thisCanvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      // render loop
      function render() {
        // convert time to seconds
        // time *= 0.001;

        // check if canvas resize needed
        if (resizeRendererToDisplaySize(renderer)) {
          const thisCanvas = renderer.domElement;
          camera.aspect = thisCanvas.clientWidth / thisCanvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        // render scene
        renderer.render(scene, camera);

        // call loop recursively
        requestAnimationFrame(render);
        console.clear();
      }
      // call render loop
      requestAnimationFrame(render);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      renderer.render(scene, camera);
    },
    toggleUI: function() {
      console.log("toggling UI");
      this.showHeader = !this.showHeader;
      this.showFooter = !this.showFooter;
      this.showButtons = !this.showButtons;
      this.showClose = !this.showClose;
      return;
    },
    toggleBuildModal: function() {
      console.log("toggling build modal");
      this.showBuildModal = !this.showBuildModal;
      return;
    },
    closeBuildModal: function() {
      console.log("closing build modal");
      this.showBuildModal = false;
      return;
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Sacramento&display=swap");
.sc {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;

  .header {
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
    width: 100%;
    position: fixed;
    top: 0;
    background: lightblue url("../assets/svg/animated/header_bg.svg?inline")
      repeat center;
    background-size: 1920px 200px;

    &__left {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      width: 100%;
      height: 100%;
      position: relative;

      h1 {
        margin: 0;
        padding: 1.125rem 0 0 2.75rem;
        position: absolute;
        top: 0;
        left: 0;
        font-family: "Sacramento", cursive;
        color: rgba(255, 255, 255, 0.8);
      }

      .cloud-left {
        width: 156px;
        height: 137px;
        position: absolute;
        bottom: 0;
        left: 0;
      }

      &__buildings-png {
        width: 92px;
        height: 135px;
        position: absolute;
        bottom: 0;
        left: 3rem;
      }
    }
    &__center {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;

      .cloud-left-div {
        width: 234px;
        height: 179px;
        position: absolute;
        bottom: -18px;
        left: -117px;
      }

      .cloud-right-div {
        width: 290px;
        height: 143px;
        position: absolute;
        bottom: -12px;
        right: -145px;
      }

      .cloud-base {
        width: 2245px;
        height: 85px;
        position: absolute;
        bottom: -59px;
        z-index: 999;
        fill: #fff;
      }
    }
    &__right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 100%;

      .cloud-right {
        width: 156px;
        height: 137px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;

    #ccont {
      width: 100%;
      height: 100%;

      #c {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      margin-bottom: 9rem;
      position: absolute;
      bottom: 0;
    }
    &__button {
      background-color: rgba(66, 135, 245, 0.75);
      width: 25rem;
      height: 4rem;
      border-radius: 0.75rem;
      border: none;
      color: white;
      font-weight: bold;
      font-size: 1.25rem;
      outline: none;

      &--close {
        background-color: transparent;
        width: 3rem;
        height: 3rem;
        position: fixed;
        top: 3rem;
        right: 3rem;
        margin: 0;
        padding: 0;
        border: none;

        svg,
        img {
          width: 100%;
          margin: 0;
          path {
            fill: red;
          }
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  footer {
    background: url("../assets/svg/footer/footer_ground.svg?inline") center
      bottom repeat-x;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 100%;
    text-align: center;
  }

  .build-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    &__body {
      background-color: #ffffff;
      position: relative;
      padding: 3rem;
      border-radius: 1rem;

      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 3rem;
        background-color: transparent;
        margin: 0;
        padding: 0;
        border: none;

        svg,
        img {
          width: 100%;
          margin: 0;
          path {
            fill: red;
          }
        }
      }

      input {
        width: 100%;
      }

      .build-button {
        width: 100%;
        height: 4rem;
        background-color: rgba(66, 135, 245, 0.75);
        border-radius: 0.75rem;
        border: none;
        color: white;
        font-weight: bold;
        font-size: 1.25rem;
        outline: none;
      }
    }

    .slider {
      -webkit-appearance: none;
      width: 100%;
      height: 25px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;
    }

    .slider:hover {
      opacity: 1;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      background: #4caf50;
      cursor: pointer;
    }

    .slider::-moz-range-thumb {
      width: 25px;
      height: 25px;
      background: #4caf50;
      cursor: pointer;
    }
  }
}

.slideup-enter-active {
  transition: all 0.3s ease;
}
.slideup-leave-active {
  transition: all 0.3s ease;
}
.slideup-enter, .slideup-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-30px);
  opacity: 0;
}

.slidedown-enter-active {
  transition: all 0.3s ease;
}
.slidedown-leave-active {
  transition: all 0.3s ease;
}
.slidedown-enter, .slidedown-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
