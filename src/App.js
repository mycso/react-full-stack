import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./components/shared/header";
import Hero from "./components/hero";
import Section from "./layout/section";
import Wrapper from "./layout/wrapper";
import LaunchCard from "./components/lauch-card";

const MainWrapper = styled.main`
  display: block;
  position: relative;
  width: 100%;

  .grid {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ContentSelector = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  button {
    border: none;
    padding: 10px;
    min-width: 100px;
    margin-right: 10px;
  }
`;

function App() {
  const [data, setData] = useState({ launches: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://localhost:4000/launches"
      );

      console.log(result.data);

      setData({ launches: result.data });
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log("DDD " +  JSON.stringify(data.launches))

  return (
    <MainWrapper>
      <Header />
      <Section>
        <Hero />
      </Section>
      <Section>
        <ContentSelector>
          <button>Launches</button>
          <button>rockets</button>
        </ContentSelector>
      </Section>
      <Section>
        {loading && <div>loading....</div>}

        {!loading && (
          <Wrapper>
            <div className="grid">
              {data.launches.map((item, index) => (
                <LaunchCard
                  key={index.toString()}
                  image={item.links.patch.small}
                  title={item.name}
                  description={item.details}
                />
              ))}
            </div>
          </Wrapper>
        )}
      </Section>
    </MainWrapper>
  );
}

export default App;
