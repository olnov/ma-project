import { Button, HStack } from "@chakra-ui/react"

const Demo = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Demo Page</h1>
        <p className="mb-4">This is a demo page.</p>
        <HStack spacing={4}>
          <Button colorScheme="blue">Button 1</Button>
          <Button colorScheme="green">Button 2</Button>
        </HStack>
      </div>
    </>
  );
};

export default Demo;
