import Layout from "../Layouts/Layout";
import ItemCard from "../components/ItemCard";
import MenuImage from "../components/MenuImages";
import { Dishes } from "../types";
import { GET_DISHES, VND, destructureDishesData } from "../utils";
import { useQuery } from '@apollo/client';

const App = () => {
  const { loading, error, data } = useQuery<Dishes>(GET_DISHES);

  if (error) { return <div>Error</div> }
  if (loading) { return <div>loading</div> }
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 ml-3">
        {data && (destructureDishesData(data).map((x, index) => {
          return (
            <ItemCard
              key={index}
              id={x.id}
              MenuElement={<MenuImage src={"http://localhost:1337" + x.img.url} size="big" />}
              title={x.name}
              price={VND.format(x.price)}
              description={x.description}
            />
          );
        }))
        }
      </div>
    </Layout>
  )
}

export default App;

