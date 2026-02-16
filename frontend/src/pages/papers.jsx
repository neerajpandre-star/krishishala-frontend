export default function Papers() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Papers</h2>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Duration</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Math Test</td>
            <td className="p-2 text-center">Math</td>
            <td className="p-2 text-center">60 min</td>
            <td className="p-2 text-center text-green-600">Published</td>
            <td className="p-2 text-center space-x-2">
              <button className="text-blue-600">Edit</button>
              <button className="text-purple-600">Build</button>
              <button className="text-red-600">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
