import "./styles.css";
import { useCallback, useState, useEffect, useRef } from "react";
import ForceGraph3d from "react-force-graph-3d";
import {
  CSS2DRenderer,
  CSS2DObject
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import "react-dat-gui/dist/index.css";
import * as dat from "dat.gui";
import * as d3 from "d3";
import "react-dat-gui/dist/index.css";

const Graph = ({ data }) => {
  const fgRef = useRef();
  const extraRenderers = [new CSS2DRenderer()];
  const [flag, setFlag] = useState(true);

  const KPIsList = [
    "impressions",
    "reach",
    "mentions",
    "engagement",
    "followers",
    "views",
    "likes",
    "shares",
    "comments"
  ];

  const [params, setParams] = useState({
    distance: "impressions",
    size: "impressions",
    thickness: "impressions",
    sentiment: true
  });

  useEffect(() => {
    const gui = new dat.GUI();

    gui
      .add(params, "distance", KPIsList)
      .name("Distance")
      .onChange(() => {
        fgRef.current.d3ReheatSimulation();
        setParams((prevState) => ({ ...prevState, distance: params.distance }));
      });

    gui
      .add(params, "size", KPIsList)
      .name("Size")
      .onChange(() => {
        setParams((prevState) => ({ ...prevState, size: params.size }));
      });

    gui
      .add(params, "thickness", KPIsList)
      .name("Thickness")
      .onChange(() => {
        setParams((prevState) => ({
          ...prevState,
          thickness: params.thickness
        }));
      });

    gui
      .add(params, "sentiment")
      .name("Color (Sentiment)")
      .onChange(() => {
        setParams((prevState) => ({
          ...prevState,
          sentiment: params.sentiment
        }));
      });
  }, []);

  const getKPIsValues = (KPI) => {
    let arr = [];
    data.nodes.forEach((obj) => arr.push(obj[KPI]));
    return arr;
  };

  const createScaler = (KPI, type) => {
    let arr = [];
    if (type === "distance") {
      arr = getKPIsValues(KPI).map((i) => Number(i) * -1);
    } else {
      arr = getKPIsValues(KPI).map((i) => Number(i));
    }
    let min = Math.min.apply(Math, arr);
    let max = Math.max.apply(Math, arr);
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    let mean = average(arr);
    let res = 0;
    if (type === "color") {
      res = d3
        .scaleLinear()
        .domain([min, mean, max])
        .range(["red", "white", "green"]);
    } else if (type === "thickness") {
      res = d3.scaleLinear().domain([min, max]).range([2, 10]);
    } else {
      res = d3.scaleLinear().domain([min, max]).range([20, 200]);
    }
    return res;
  };

  const normObject = (type) => {
    let obj = {};
    KPIsList.forEach((kpi) => {
      obj[kpi] = createScaler(kpi, type);
      if (type === "color") {
        obj["sentiment"] = createScaler("sentiment", "color");
      }
    });
    return obj;
  };

  const distScaler = normObject("distance");
  const sizeScaler = normObject("size");
  const thicknessScaler = normObject("thickness");
  const colorScaler = normObject("color");

  useEffect(() => {
    // Distance Scaling
    fgRef.current.d3Force("charge").strength(-1000);
    fgRef.current.d3Force("link").distance((link) => {
      if (link.source.type === "entity") {
        return distScaler[params.distance](link.source[params.distance] * -1);
      } else {
        return 10;
      }
    });
  }, [distScaler, params]);

  const handleClick = useCallback(
    (node) => {
      d3.selectAll("#node-info-container").remove();
      // Aim at node from outside it
      const distance = 200;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
      setFlag(false);

      d3.select(".scene-container")
        .append("div")
        .attr("id", "node-info-container")
        .style("color", "white")
        .style("font-size", "24px")
        .style("position", "fixed")
        .style("top", "50%")
        .style("left", "50%")
        .style("transform", "translate(-50%, -50%)")
        .style("padding", "10px")
        .style("border-radius", "10px")
        .style("background-color", "rgba(0,0,0,0.4)");

      d3.select("#node-info-container")
        .append("h3")
        .attr("id", "node-info-title")
        .style("color", "white")
        .style("text-align", "center")
        .text(node.name);

      if (node.type === "entity") {
        d3.select("#node-info-container")
          .append("p")
          .attr("id", "node-info")
          .style("color", "white")
          .style("font-size", "20px")
          .style("text-align", "center")
          .style("position", "relative")
          .text(`Top 5 Hashtags: ${node.hashtags_top_5}`);
      }
    },
    [fgRef]
  );

  const handleBackgroundClick = useCallback(() => {
    if (!flag) {
      fgRef.current.cameraPosition({ x: -200, y: -200, z: -200 }, 0, 3000);
      setFlag(true);
      d3.selectAll("#node-info-container").remove();
    } else {
      return;
    }
  });

  return (
    <>
      <ForceGraph3d
        ref={fgRef}
        extraRenderers={extraRenderers}
        graphData={data}
        nodeVal={(node) => {
          if (node.type === "topic") {
            return 1000;
          } else {
            return sizeScaler[params.size](node[params.size]);
          }
        }}
        d3VelocityDecay={0.9}
        enableNodeDrag={false}
        nodeColor={(node) => {
          if (node.type === "topic") return "orange";

          if (node.type === "entity") {
            if (params.sentiment) {
              return colorScaler.sentiment(node.sentiment);
            } else return "white";
          }
        }}
        linkWidth={(link) =>
          thicknessScaler[params.thickness](link.source[params.thickness])
        }
        linkOpacity={0.5}
        nodeOpacity={1}
        onNodeClick={handleClick}
        nodeLabel={(node) => ""}
        onBackgroundClick={handleBackgroundClick}
        nodeThreeObject={(node) => {
          if (flag) {
            const nodeEl = document.createElement("graph");
            nodeEl.textContent = "";
            nodeEl.textContent = node.name;
            nodeEl.style.fontFamily = "Comic Sans MS, Comic Sans";
            nodeEl.style.color = "white";
            nodeEl.style.top = "-35px";
            return new CSS2DObject(nodeEl);
          } else {
            return;
          }
        }}
        nodeThreeObjectExtend={true}
      />
    </>
  );
};

export default Graph;
