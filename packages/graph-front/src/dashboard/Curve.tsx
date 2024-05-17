import EChartsReact from 'echarts-for-react';
import { getAmountAndUnit } from './utils';

interface Props {
  labels: string[];
  values:
    | number[]
    | {
        value: number;
        itemStyle: {
          color: string;
        };
      }[];
  barsColor: string;
  title?: string;
  width?: string;
  unit: string;
}

export const Curve = ({
  labels,
  values,
  barsColor,
  title,
  width = '100%',
  unit,
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        width,
        height: '100%',
        flexDirection: 'column',
        gap: '0.5em',
      }}
    >
      {title !== undefined && (
        <h1 style={{ color: 'white', textAlign: 'center', fontSize: '1.5em' }}>
          {title}
        </h1>
      )}
      <EChartsReact
        style={{
          width: '100%',
          height: '100%',
        }}
        option={{
          xAxis: {
            type: 'category',
            data: labels,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: true,
              lineStyle: {
                color: '#444',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#444',
              },
            },
            axisLabel: {
              formatter: (v: number) => {
                const { value, unit: u } = getAmountAndUnit({
                  value: v,
                  unit,
                });

                return `${value} ${u}`;
              },
            },
          },
          series: [
            {
              data: values,
              type: 'bar',
            },
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            backgroundColor: 'black',
            textStyle: {
              color: 'white',
            },
          },
          color: [barsColor],
          grid: {
            left: 60,
            right: 40,
            top: 40,
            bottom: 40,
          },
          backgroundColor: '#111',
          legend: {
            textStyle: {
              color: 'white',
            },
          },
        }}
      />
    </div>
  );
};
