<template>
  <input type="range" :value="value" :style="{ background: grad}" @input="restyle">
</template>

<script>
    export default {
      name: 'range',
      props: {
        value: {
          type: Number,
          default: ""
        },
        color: {
          type: String,
          default: "#7986CB"
        },
        bgcolor: {
          type: String,
          default: "#eee"
        }
      },
      methods: {
        restyle(e) {
            this.$emit('input', e.target.value);
        }
      },
      computed: {
        grad() {
          debugger
          const { color, value, bgcolor } = this;
          return `linear-gradient(to right, ${color} 0%, ${color} ${value}%, ${bgcolor} ${value}.1%, ${bgcolor} 100%)`;
        }
      },
    }
</script>

<style >

  input[type=range] {
    -webkit-appearance: none;
    margin: 0;
    width: 100%;
    position: relative;
    transition: background .2s, color .2s;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]:hover::-webkit-slider-thumb {
    background: #7986CB;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    border-radius: 0;
    border: none;
  }
  input[type=range]::-webkit-slider-thumb {
    border: 0 solid rgba(255, 255, 255, 0.1);
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #b3b3b3;
    cursor: pointer;
    transform: rotate(45deg);
    -webkit-appearance: none;
    margin-top: -2px;
    transition: transform .2s, color .2s;
  }
  input[type=range]::-webkit-slider-thumb:hover {
    transform: rotate(45deg) scale(1.5, 1.5);
    background: #7986CB;
    box-shadow: 2px 2px 1px rgba(119, 119, 119, 0.4), 0px 0px 2px rgba(132, 132, 132, 0.4);
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 2px 2px 2px #222, 0px 0px 2px #2f2f2f;
    background: #7986CB;
    border-radius: 0;
    border: none;
  }
  input[type=range]::-moz-range-thumb {
    border: 0 solid rgba(255, 255, 255, 0.1);
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #b3b3b3;
    cursor: pointer;
    transform: rotate(45deg);
    transition: transform .2s, color .2s;
  }
  input[type=range]::-moz-range-thumb:hover {
    transform: rotate(45deg) scale(1.5, 1.5);
    background: #7986CB;
    box-shadow: 2px 2px 1px rgba(119, 119, 119, 0.4), 0px 0px 2px rgba(132, 132, 132, 0.4);
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    animate: 0.2s;
    background: #7986CB;
    border-color: transparent;
    border-width: 12px 0;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #7986CB;
    border: 0px solid #000;
    border-radius: 0;
    box-shadow: 2px 2px 2px #222, 0px 0px 2px #2f2f2f;
  }
  input[type=range]::-ms-fill-upper {
    background: #7986CB;
    border: 0px solid #000;
    border-radius: 0;
  }
  input[type=range]::-ms-thumb {
    border: 0 solid rgba(255, 255, 255, 0.1);
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #b3b3b3;
    cursor: pointer;
    transform: rotate(45deg);
    transition: transform .2s, color .2s;
  }
  input[type=range]::-ms-thumb:hover {
    transform: rotate(45deg) scale(1.5, 1.5);
    background: #7986CB;
    box-shadow: 2px 2px 1px rgba(119, 119, 119, 0.4), 0px 0px 2px rgba(132, 132, 132, 0.4);
  }
</style>
