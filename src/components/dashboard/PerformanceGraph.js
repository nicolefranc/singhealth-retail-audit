import { Line } from '@ant-design/charts';

export default function PerformanceGraph({content, type}) {

  var config = {
    data: content,
    xField: 'month',
    yField: 'score',
    legend: false,
    stepType: 'vh',
    seriesField: 'key'
  };

  if (type === 'performance'){
      config['seriesField'] = undefined
  }

  return <Line {...config} />;
}