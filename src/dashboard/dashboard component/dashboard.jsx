import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [imageData, setImageData] = useState([]);
  const chartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'serviceImages'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setImageData(data);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  useEffect(() => {
    if (imageData.length > 0) {
      renderChart();
    }
  }, [imageData]);

  useEffect(() => {
    if (chartRef.current && imageData.length > 0) {
      renderChart();
    }
  }, [chartRef, imageData]);

  const renderChart = () => {
    const labels = imageData.map(item => item.label);
    const counts = imageData.map(item => item.count);

    const ctx = document.getElementById('imageChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Image Count',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div>
      <h2>Image Chart</h2>
      <canvas id="imageChart" width="400" height="400" ref={chartRef}></canvas>
    </div>
  );
};

export default Dashboard;
