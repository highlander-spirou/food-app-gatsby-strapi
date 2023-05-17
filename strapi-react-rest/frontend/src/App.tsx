import Layout from "./Layouts/Layout";
import ItemCard from "./components/ItemCard";
import MenuImage from "./components/MenuImages";
import { useStore } from "./context/StoreContext";
import { VND, getImgFromStrapi } from "./utils";


const App = () => {
  const { data, error } = useStore()

  if (error) { console.log(error) }

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 ml-3">
        {data && (data.map((x, index) => {
          return (
            <ItemCard
              key={index}
              id={x.id}
              MenuElement={<MenuImage src={"http://localhost:1337" + getImgFromStrapi(x.attributes, "large")} size="big" />}
              title={x.attributes.name}
              price={VND.format(x.attributes.price)}
              description={x.attributes.description}
            />
          );
        }))
        }
      </div>
    </Layout>
  )
}

export default App;
