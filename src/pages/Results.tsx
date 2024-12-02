import React from 'react';
import { useParams } from 'react-router-dom';
import { getVoteResults } from '../db';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Results() {
  const { id } = useParams();
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    if (id) {
      const data = getVoteResults(id);
      setResults(data);
    }
  }, [id]);

  const downloadResults = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + results.map(r => `${r.choice},${r.count}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vote_results.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Campaign Results</h1>
        <button
          onClick={downloadResults}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Download Results
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <BarChart width={600} height={400} data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="choice" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#4f46e5" />
        </BarChart>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Choice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Votes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result, index) => {
                const total = results.reduce((sum, r) => sum + r.count, 0);
                const percentage = ((result.count / total) * 100).toFixed(2);
                
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.choice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}