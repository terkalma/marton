import './App.css';
import { FractionSlider } from './sliders/FractionSlider';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Paper } from '@mui/material';
import { ys, getAllOptions } from './values';
import { ScatterChart, XAxis, YAxis, Scatter, Tooltip, CartesianGrid } from 'recharts';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontWeight: 600,
  fontSize: 'large'
}));



function App() {
  const [active, setActive] = useState("y");
  const [data, setData] = useState(() => {
    const yIndex = 0;
    const index = 0;
    return {
      index,
      yIndex
    }
  })

  const updateData = (newData) => {
    if (typeof newData.yIndex == "number") {
      const index = 0;
      const { yIndex } = newData;
      setData({index, yIndex});
    } else {
      setData({...data, ...newData});
    }
  }

  const options = getAllOptions(ys[data.yIndex]);

  const ff = (frac) => {
    if (frac.d !== 1) {
      return <>
        <sup>{frac.n}</sup>&frasl;<sub>{frac.d}</sub>
      </>
    } else {
      return <>{frac.n}</>
    }
  }

  return (
    <div className="App">
      <Grid container rowSpacing={4} columnSpacing={2} alignItems="center"  justifyContent="center">
        <FractionSlider options={ys} id="y" label="Y" defaultValue={data.yIndex}
          updateData={updateData} active={true} setActive={setActive} />
        <FractionSlider options={options.x} id="x" label="X" defaultValue={data.index}
          updateData={updateData} active={active === "x"} setActive={setActive} />
        <FractionSlider options={options.xy} id="xy" label="XY" defaultValue={data.index}
          updateData={updateData} active={active === "xy"} setActive={setActive} />
        <FractionSlider options={options.xyy} id="xyy" label={<>XY<sup>2</sup></>} defaultValue={data.index}
          updateData={updateData} active={active === "xyy"} setActive={setActive} />
        <FractionSlider options={options.z} id="z" label="Z" defaultValue={data.index}
          updateData={updateData } active={active === "z"} setActive={setActive}/>

        <Grid item xs={8}>
          <Item>
            <p className='eq'>
              {ff(options.x[data.index])}&nbsp;+&nbsp;{ff(options.x[data.index])}{ff(ys[data.yIndex])}&nbsp;+&nbsp;{ff(options.x[data.index])}{ff(ys[data.yIndex])}<sup>2</sup>&nbsp;=&nbsp;{ff(options.z[data.index])}
            </p>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <ScatterChart
            width={400} height={200}
            margin={{ top: 20, right: 20, bottom: 20, left: -20 }}
            data={[
              {
                x: options.x[data.index],
                y: options.x[data.index]
              },
              {
                x: options.x[data.index] * ys[data.yIndex],
                y: options.x[data.index] * ys[data.yIndex]
              },
              {
                x: options.x[data.index] * ys[data.yIndex] * ys[data.yIndex],
                y: options.x[data.index] * ys[data.yIndex] * ys[data.yIndex]
              }
            ]}
          >
            <XAxis dataKey="x" name="x" />
            <YAxis dataKey="y" name="y" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={[
              {
                x: options.x[data.index],
                y: options.x[data.index]
              },
              {
                x: options.x[data.index] * ys[data.yIndex],
                y: options.x[data.index] * ys[data.yIndex]
              },
              {
                x: options.x[data.index] * ys[data.yIndex] * ys[data.yIndex],
                y: options.x[data.index] * ys[data.yIndex] * ys[data.yIndex]
              }
            ]} fill="#8884d8" />
          </ScatterChart>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
