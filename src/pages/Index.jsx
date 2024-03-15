import React, { useState } from "react";
import { Box, Heading, Input, Button, Textarea, Stack, IconButton, Flex, Spacer, VStack, StackDivider, Text } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const addNote = () => {
    if (title && content && date) {
      setNotes([...notes, { title, content, date: new Date(date) }]);
      setTitle("");
      setContent("");
      setDate("");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <Box maxWidth="800px" margin="auto" p={4}>
      <Heading mb={8}>Note Taking App</Heading>
      <Stack spacing={4}>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <Input placeholder="Date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button leftIcon={<FaPlus />} onClick={addNote}>
          Add Note
        </Button>
      </Stack>
      <VStack divider={<StackDivider />} spacing={4} align="stretch" mt={8}>
        {notes.map((note, index) => (
          <Box key={index} p={4} shadow="md" borderWidth="1px">
            <Flex>
              <Heading fontSize="xl">{note.title}</Heading>
              <Spacer />
              <IconButton icon={<FaTrash />} onClick={() => deleteNote(index)} />
            </Flex>
            <Text mt={4}>{note.content}</Text>
            <Text color="gray.500" fontSize="sm">
              {new Date(note.date).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
