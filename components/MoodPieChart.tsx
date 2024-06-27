'use client'
import {Pie, PieChart, Cell} from 'recharts';


const MoodPieChart = ({data}: any) => {
  // data shall be the analyses data from the database, has mood and color
  // to make a pie chart we need to count the number of each mood
  // and return an array of objects with the mood and the count
  // as well as to use the color of each mood for the pie chart
  // the data array should look like this: [{name: 'mood', value: count, color: color}]
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label={({name, value}) => `${name}: ${value}`}
      >
        {
          data.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} />)
        }
      </Pie>
    </PieChart>
  );
}
export default MoodPieChart;