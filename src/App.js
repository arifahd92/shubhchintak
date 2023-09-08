import React, { useEffect, useState } from "react";
import "./app.css";
export default function App() {
  const [inptVal, setInputVal] = useState("");
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  // let item = [];
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        console.log("getdata called");
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const item = data.products; //array of object
        // console.log(data);

        if (!!selectedOption) {
          console.log(selectedOption);
          filterdData(item);
        }
        if (inptVal) {
          const searchedProduct = item.filter((item) =>
            item.title.toLowerCase().includes(inptVal)
          );
          setPhones(searchedProduct);
          setLoading(false); // Data loaded successfully, set loading to false
        } else {
          setPhones(item);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPhones([]);
        setLoading(false); // An error occurred, set loading to false
      }
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [inptVal, selectedOption]);
  //searching functionality
  const handleInoutChange = (e) => {
    const val = e.target.value;
    // console.log(val);
    setInputVal(val);
  };
  // select handeler
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    //.log(selectedValue);
    setSelectedOption(selectedValue);
  };
  //sorting functionality
  const filterdData = (item) => {
    if (selectedOption === "name") {
      console.log("i got hitted");
      item.sort((a, b) => {
        console.log(a.title);
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();

        if (nameA < nameB) {
          return -1; // If nameA is less than nameB, place a before b
        }
        if (nameA > nameB) {
          return 1; // If nameA is greater than nameB, place a after b
        }
        return 0; // Names are equal, no change in order
      });
    } else if (selectedOption === "price") {
      item.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (selectedOption === "rating") {
      item.sort((a, b) => {
        return b.rating - a.rating;
      });
    }
  };
  // Render a loading message while waiting for data
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="containerHead">
        <h1>item List</h1>
      </div>
      <hr />
      <div className="container2">
        <input
          type="text"
          name=""
          id="inpt"
          placeholder="search item"
          onChange={handleInoutChange}
          value={inptVal}
        />
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">sort</option>
          <option value="name">by name </option>
          <option value="price">by price </option>
          <option value="rating">by rating </option>
        </select>
      </div>
      <ul>
        {phones.length !== 0 &&
          phones.map((item) => {
            return (
              <>
                <li key={item.id}>
                  {" "}
                  <div className="containerItem">
                    <img src={item.thumbnail} alt="thumbnail" srcset="" />

                    <div className="containerList">
                      <span>name: {item.title}</span>

                      <span>price :{item.price}</span>
                      <span>-rating: {item.rating}*</span>
                    </div>
                  </div>
                </li>
                <hr />
              </>
            );
          })}
      </ul>
    </>
  );
}
