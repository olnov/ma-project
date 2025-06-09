import { Box, Text, Input, Button, HStack } from "@chakra-ui/react";
import { createFeedbackRequest } from "../services/FeedbackService";
import { toaster } from "@/components/ui/toaster";
import { BiCopy } from "react-icons/bi";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const RequestFeedback = () => {

  const [link, setLink] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  
  const handleRequestFeedback = async () => {

    try {
      const token = await getAccessTokenSilently();
      // provides auth0 token based on the user currently logged in. 
      // Handles token refresh if necessary
      // automatically attaches the sub (i.e. user ID) etc
      // can pass scopes as argument e.g. getAccessTokenSilently({scope: 'read:messages'})
      const feedbackRequestLink = await createFeedbackRequest(token);

      if (feedbackRequestLink.status === 200) {
        setLink(feedbackRequestLink.data.link);
        toaster.create({
          title: "Feedback request created",
          description: `Your feedback request was created successfully`,
          type: "success",
        });

      } else {
        toaster.create({
          title: "Error",
          description: "Token invalid or expired. Please log in again.",
          type: "error",
        });
      }

    } catch(error) {
      console.log("Token error:", error);
      toaster.create({
        title: "Error",
        description: "Token missing or expired. Please log in again.",
        type: "error",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    toaster.create({
      title: "Link copied",
      description: "The feedback request link has been copied to your clipboard.",
      type: "success",
    });
  }

  return (
    <Box marginTop={"30px"}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        What is your main question for the feedback?
      </Text>
      <Input placeholder="Enter your feedback question here" size="md" mb={4} />
      <HStack spacing={4} mb={4}>
        <Input
          placeholder="Here will be the feedback request link"
          size="md"
          value={link}
          readOnly
        />
        <Button
          onClick={handleCopyLink}
          variant="outline"
          bgColor="grey.300"
        >
          <BiCopy />
        </Button>
      </HStack>
      <Button colorPalette={"blue"} size="md" onClick={handleRequestFeedback}>
        Request Feedback
      </Button>
    </Box>
  );
};
export default RequestFeedback;

// const RequestFeedback = () => {
//   const [link, setLink] = useState("");
  
//   const handleRequestFeedback = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const feedbackRequestLink = await createFeedbackRequest(accessToken);
//     if (feedbackRequestLink.status === 200) {
//       setLink(feedbackRequestLink.data.link);
//       toaster.create({
//         title: "Feedback request created",
//         description: `Your feedback request created successfully`,
//         type: "success",
//       });
//     }
//     if (feedbackRequestLink.status === 401) {
//       toaster.create({
//         title: "Error",
//         description: "Token invalid or expired. Please log in again.",
//         type: "error",
//       });
//     }
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(link);
//     toaster.create({
//       title: "Link copied",
//       description: "The feedback request link has been copied to your clipboard.",
//       type: "success",
//     });
//   }

//   return (
//     <Box marginTop={"30px"}>
//       <Text fontSize="xl" fontWeight="bold" mb={4}>
//         What is your main question for the feedback?
//       </Text>
//       <Input placeholder="Enter your feedback question here" size="md" mb={4} />
//       <HStack spacing={4} mb={4}>
//         <Input
//           placeholder="Here will be the feedback request link"
//           size="md"
//           value={link}
//           readOnly
//         />
//         <Button
//           onClick={handleCopyLink}
//           variant="outline"
//           bgColor="grey.300"
//         >
//           <BiCopy />
//         </Button>
//       </HStack>
//       <Button colorPalette={"blue"} size="md" onClick={handleRequestFeedback}>
//         Request Feedback
//       </Button>
//     </Box>
//   );
// };
// export default RequestFeedback;
