import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { dashboards } from '../../component/text';
import { black } from 'material-ui/styles/colors';


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
    // console.log('Project Data:', projectData); // Log project data
    const imageCounts = projectData.map(project => project.images ? project.images.length : 0);  
      // console.log('Image Counts:', imageCounts); // Log image counts
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
            borderColor: 'rgba(255, 125, 140 , 1)',
            borderWidth: 2,      
            barPercentage: 0.5,
          
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels:{
                color: 'black'
              }

            },
            title: {
              display: true,
              text: 'Image Chart',
              color: 'black'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Images',
                color: 'black'
              },
              ticks: {
                color: 'black', 
                font: {
                  size: 12, 
                  weight: 'bold' 
                },

                callback: function(value, index, values) {
                  return value;
                },
                

              }
            },
            x: {
              title: {
                display: true,
                text: 'Project',
                color: 'black'
              },
              ticks: {
                color: 'black'
              }
            }
          }
        }
      });
    }
  };
  

  return (
    <>
    <p className='text-3xl mb-8 font-bold'>{dashboards}</p>

    <div className='w-80 p-2 border text-black'>
      <p className='font-semibold text-center text-sm'>Uploaded Project Chart</p>
      <canvas id="imageChart" style={{ height: "400px", width: '400px' }} ref={chartRef}></canvas>
    </div>
    <div>
      </div>
      </>
  );
};

export default Dashboard;
