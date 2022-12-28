import { select, easeLinear } from 'd3';
import * as d3 from 'd3';

export class NeuronPainter {
  data = [];
  connData = [];
  id = 0;
  frame = 0;
  dirSpeed = 2;
  radius = 20;
  lineWidth = 2;
  neuronWidth = 2;
  coeff = 0.5;
  hazardCoeff = 0.1;
  returnCoeff = 0.005;

  parametrize(frameCb) {
    this.frameCb = frameCb;
  }

  async start() {
    this.generateInitialData();
    this.generateNeurons();

    //starting up everything
    //generating initial data
    for (this.frame = 0; this.frame < 500; this.frame++) {
      this.generateNeurons();
      this.generateConnections();
      this.adjustData();
      this.mutateData();
      this.mutateData();

      if (this.frame % 10 === 0) {
        this.frame = 0;
      }
      await this.sleep(1000 / 60);
    }

    //drawing neurons based on data
    //modifying data according to events/rules
  }

  generateNeurons = () => {
    //neuron has cx,cy,radius
    let rootElement = select(`#root-group`);
    //liniarizing data
    let dataCopy = [...this.data];
    for (let idx in dataCopy) {
      dataCopy[idx].radius = randomMult(0.85, 1.15) * this.radius;
    }
    rootElement
      .selectAll('circle')
      .data(dataCopy)
      .enter()
      .append('circle')
      .attr('opacity', 1)
      .attr('stroke-width', 2)
      .attr('stroke', 'white')
      .attr('r', (val) => val.radius)
      .attr('cx', (value) => value.cx)
      .attr('cy', (value) => value.cy);

    rootElement
      .selectAll('circle')
      .data(dataCopy, (val) => {
        return val.id;
      })
      // .transition()
      // .duration(animationsSpeed)
      // .ease(easeLinear)
      .attr('opacity', 1)
      .attr('strokeWidth', 2)
      .attr('stroke', 'white')
      // .attr('r', )
      .attr('cx', (value) => value.cx)
      .attr('cy', (value) => value.cy);

    rootElement
      .selectAll('text')
      .data(dataCopy)
      .enter()
      .append('text')
      // .text((value) => {
      //   return `${value.id}`;
      // })
      .attr('fill', 'white')
      .attr('x', (value) => value.cx)
      .attr('y', (value) => value.cy);

    // rootElement
    //   .selectAll('text')
    //   .data(dataCopy)
    //   .append('text')
    //   .attr('attr', 'ceva')
    //   .attr('x', (value) => value.cx)
    //   .attr('y', (value) => value.cy);
  };

  getNeuronData = (id) => {
    for (let neuron of this.data) {
      if (neuron.id == id) {
        return neuron;
      }
    }
  };

  generateConnections = () => {
    let rootElement = select(`#root-group2`);
    let dataCopy = [...this.connData];

    rootElement
      .selectAll('line')
      .data(dataCopy)
      .attr('opacity', 1)
      .attr('fill', 'white')
      .attr('stroke', 'white')
      .attr('x1', (value) => this.getNeuronData(value.n1ID).cx)
      .attr('y1', (value) => this.getNeuronData(value.n1ID).cy)
      .attr('x2', (value) => this.getNeuronData(value.n2ID).cx)
      .attr('y2', (value) => this.getNeuronData(value.n2ID).cy)
      .attr('stroke-width', 1);

    rootElement
      .selectAll('line')
      .data(dataCopy)
      .enter()
      .append('line')
      .attr('opacity', 1)
      .attr('stroke', 'white')
      .attr('x1', (value) => this.getNeuronData(value.n1ID).cx)
      .attr('y1', (value) => this.getNeuronData(value.n1ID).cy)
      .attr('x2', (value) => this.getNeuronData(value.n2ID).cx)
      .attr('y2', (value) => this.getNeuronData(value.n2ID).cy)
      .attr('stroke-width', 1);
  };

  generateRandomNeuronsData = (numNeurons, minX, maxX, minY, maxY) => {
    let args = [];
    for (let idx = 0; idx < numNeurons; idx++) {
      let cx = Math.random() * (maxX - minX) + minX;
      let cy = Math.random() * (maxY - minY) + minY;
      const props = {
        cx,
        cy,
      };
      args.push(props);
    }

    let data = [];
    for (let props of args) {
      data.push({
        ...props,
        dx: 0,
        dy: 0,
        ox: props.cx,
        oy: props.cy,
        r: 10,
        id: this.id,
        returning: false,
      });
      this.id += 1;
    }
    return data;
  };

  generateNeuronsData = (minX, maxX, minY, maxY) => {
    let data = [];
    let args = [];
    let structure = [6, 4, 3, 1, 2, 3, 4, 6];
    //3 2 1 1 2 3
    // 6 layers in width

    let stepX = (maxX - minX) / (structure.length - 1);
    let posX = minX;

    for (let layerX = 0; layerX < structure.length; layerX++) {
      let stepY = (maxY - minY) / 6;
      let posY = (-stepY / 2) * (structure[layerX] - 1) + (maxY + minY) / 2;
      for (let Yneuron = 0; Yneuron < structure[layerX]; Yneuron++) {
        let props = {
          cx: posX,
          cy: posY,
        };
        args.push(props);
        posY += stepY;
      }
      posX += stepX;
    }

    for (let props of args) {
      data.push({
        ...props,
        dx: 0,
        dy: 0,
        ox: props.cx,
        oy: props.cy,
        r: 10,
        id: this.id,
        returning: false,
      });
      this.id += 1;
    }
    return data;
  };

  generateInitialData = () => {
    //getting windows size and the proper number of neurons
    let minX = -50;
    let maxX = window.innerWidth + 50;
    let minY = -100;
    let maxY = 600;

    let numNeurons = parseInt(maxX / 100);

    let data = this.generateNeuronsData(minX, maxX, minY, maxY);
    let newConnData = [
      0, 6, 2, 1, 3, 7, 3, 8, 4, 9, 5, 9, 6, 10, 10, 13, 7, 10, 7, 11, 8, 12, 9,
      12, 8, 11, 13, 14, 8, 10, 11, 13, 12, 13, 13, 15, 15, 17, 15, 18, 17, 20,
      17, 21, 17, 22, 14, 16, 16, 19, 16, 20, 18, 21, 22, 27, 22, 28, 22, 26,
      21, 26, 20, 26, 19, 23,
    ];
    let connData = [];
    for (let i = 0; i < newConnData.length; i += 2) {
      connData.push({
        n1ID: newConnData[i],
        n2ID: newConnData[i + 1],
      });
    }
    this.connData = connData;
    this.data = data;
  };

  mutateData = () => {
    // adding data mutations for visual effects
    // picking a random neuron
    let random = parseInt(Math.random() * this.data.length);
    let tries = 0;
    while (this.data[random].returning == true) {
      let random = parseInt(Math.random() * this.data.length);
      tries += 1;
      if (tries >= 10) {
        return;
      }
    }
    let newNeuron = this.data[random];
    // giving a random direction
    newNeuron.dx += (Math.random() * 2 - 1) * this.coeff * this.hazardCoeff;
    newNeuron.dy += (Math.random() * 2 - 1) * this.coeff * this.hazardCoeff;
    this.data[random] = newNeuron;
  };

  adjustData = () => {
    //changes data according to the current state
    let newData = [];
    for (let neuron of this.data) {
      neuron.cx += neuron.dx;
      neuron.cy += neuron.dy;
      //checks if neuron is too far from origin
      if (
        (neuron.cx - neuron.ox) * (neuron.cx - neuron.ox) +
          (neuron.cy - neuron.oy) * (neuron.cy - neuron.oy) >
        this.radius * this.radius
      ) {
        neuron.dx +=
          clamp(neuron.ox - neuron.cx, -1, 1) * this.coeff * this.returnCoeff;
        neuron.dy +=
          clamp(neuron.oy - neuron.cy, -1, 1) * this.coeff * this.returnCoeff;
        neuron.returning = true;
      }
      if (
        neuron.returning &&
        (neuron.cx - neuron.ox) * (neuron.cx - neuron.ox) +
          (neuron.cy - neuron.oy) * (neuron.cy - neuron.oy) <
          (this.radius * this.radius) / 4
      ) {
        neuron.dx = 0;
        neuron.dy = 0;
        neuron.returning = false;
      }
      // fading directions for smooth animations

      newData.push(neuron);
    }

    this.data = newData;
  };
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const randomMult = (min, max) => {
  return Math.random() * (max - min) + min;
};
