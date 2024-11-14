import React from 'react';

interface DataObject {
  id: number;
  title: string;
  completed: boolean;
  userId?: number; // Optional, since we are not displaying it
}

interface TableProps {
  dataToDisplay: DataObject[];
}

export const Table: React.FC<TableProps> = ({ dataToDisplay }) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(dataToDisplay[0]).map((key) => {
            if (key !== "userId") return <th key={key}>{key.toUpperCase()}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataToDisplay.map((obj) => {
          return (
            <tr key={obj.id}>
              <td>{obj.id}</td>
              <td>{obj.title}</td>
              <td>{obj.completed.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};



