import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [projectData, setProjectData] = useState([]);
  const chartRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setProjectData(data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, []);

  useEffect(() => {
    if (projectData.length > 0) {
      renderChart();
    }
  }, [projectData]);

  const renderChart = () => {
    const projectNames = projectData.map(project => project.name);
    const imageCounts = projectData.map(project => project.imageUrl ? project.imageUrl.length : 0); // Check if imageUrl exists

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: projectNames,
          datasets: [{
            label: 'Number of Images',
            data: imageCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Images'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Project'
              }
            }
          }
        }
      });
    }
  };

  return (
    <div className='w-80 border'>
      <h2>Image Chart</h2>
      <canvas id="imageChart" style={{ height: "400px", width: '400px' }} ref={chartRef}></canvas>
    </div>
  );
};

export default Dashboard;
