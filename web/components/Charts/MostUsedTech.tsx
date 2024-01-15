import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Project } from "../../common/types";

export default function AmoutPerProject({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
  const uniqueArray = (array: string[]) => Array.from(new Set(array));
  return (
    <Bar
      options={{ responsive: true, maintainAspectRatio: false }}
      data={{
        labels: uniqueArray(allProjects.map((project) => project.project_name)),
        datasets: [
          {
            label: "Project Prices",

            data: uniqueArray(allProjects.map((project) => project.project_name)).map(
              (area) => {
                const amountbyarea = allProjects.filter(
                  (project) => project.project_name == area
                );
                return amountbyarea
                  .map(
                    (uniqueProject) => uniqueProject.price
                  )
                  .reduce((a, b) => a + b);
              }
            ),
            backgroundColor: [
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
            ],
          },
        ],
      }}
    />
  );
}
