import { Line } from '@ant-design/charts';

export default function PerformanceGraph({content, type}) {

  var config = {
    data: content,
    xField: 'month',
    yField: 'score',
    legend: false,
    stepType: 'vh',
  };

  if (type === 'all'){
      config['seriesField'] = 'key'
  }

  return <Line {...config} />;
}