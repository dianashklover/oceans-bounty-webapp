import React, { useState } from "react";
import { Button, Input, Card, CardBody } from "@chakra-ui/react";
import { motion } from "framer-motion";

const predefinedProducts = {
  "123-456": { name: "Tropical Stew", },//image: "/images/tropical_stew.png" },
  "789-101": { name: "Coconut Pie", },//image: "/images/coconut_pie.png" },
};

const fetchItemInfo = (id) => {
  const mockData = {
    "123": { name: "Coconut", },//image: "/images/coconut.png" },
    "456": { name: "Palm Leaf", },//image: "/images/palm_leaf.png" },
    "789": { name: "Crab Meat", },//image: "/images/crab_meat.png" },
    "101": { name: "Banana", },//image: "/images/banana.png" },
  };
  return mockData[id] || { name: "Unknown Item", };//image: "/images/unknown.png" };
};

export default function ItemCombiner() {
  const [ids, setIds] = useState("");
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null);
  const [isCooking, setIsCooking] = useState(false);

  const handleAddItem = () => {
    const item = fetchItemInfo(ids);
    setItems([...items, { id: ids, ...item }]);
    setIds("");
  };

  const handleCombine = () => {
    setIsCooking(true);
    setTimeout(() => {
      const combinedKey = items.map((item) => item.id).sort().join("-");
      setResult(predefinedProducts[combinedKey] || { name: "No matching recipe", });//image: "/images/no_recipe.png" });
      setIsCooking(false);
    }, 2000);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-green-200 rounded-lg shadow-md border-4 border-yellow-600">
      <h1 className="text-xl font-bold mb-4 text-center text-green-900">Island Survival Cookbook</h1>
      <div className="flex gap-2 mb-4">
        <Input value={ids} onChange={(e) => setIds(e.target.value)} placeholder="Enter Item ID" />
        <Button onClick={handleAddItem}>Add</Button>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2">
        {items.map((item, index) => (
          <Card key={index} className="p-2 flex flex-col items-center bg-yellow-200 border border-green-900">
            <img src={item.image} alt={item.name} className="w-16 h-16" />
            <CardBody>{item.name}</CardBody>
          </Card>
        ))}
      </div>
      <Button onClick={handleCombine} className="w-full mb-4 bg-orange-600 hover:bg-orange-700">
        Cook Over Campfire
      </Button>
      {isCooking && (
        <motion.div
          className="w-16 h-16 mx-auto"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🔥
        </motion.div>
      )}
      {result && (
        <Card className="p-4 text-center bg-yellow-300 border border-green-800">
          <img src={result.image} alt={result.name} className="w-24 h-24 mx-auto" />
          <CardBody className="font-bold text-green-900">{result.name}</CardBody>
        </Card>
      )}
    </div>
  );
}
