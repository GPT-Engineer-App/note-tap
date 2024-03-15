import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Textarea, Stack, IconButton, Flex, Spacer, VStack, StackDivider, Text } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (editIndex !== null) {
      setTitle(notes[editIndex].title);
      setContent(notes[editIndex].content);
    }
  }, [editIndex, notes]);

  const saveNote = () => {
    if (title && content) {
      if (editIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = {
          ...updatedNotes[editIndex],
          title,
          content,
          modificationDate: new Date(),
        };
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, { title, content, creationDate: new Date(), modificationDate: new Date() }]);
      }
      setTitle("");
      setContent("");
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
        <Button leftIcon={<FaPlus />} onClick={saveNote}>
          {editIndex !== null ? "Save Changes" : "Add Note"}
        </Button>
      </Stack>
      <VStack divider={<StackDivider />} spacing={4} align="stretch" mt={8}>
        {notes.map((note, index) => (
          <Box key={index} p={4} shadow="md" borderWidth="1px">
            <Flex>
              <Heading fontSize="xl">{note.title}</Heading>
              <Spacer />
              <IconButton icon={<FaEdit />} onClick={() => setEditIndex(index)} mr={2} />
              <IconButton icon={<FaTrash />} onClick={() => deleteNote(index)} />
            </Flex>
            <Text mt={4}>{note.content}</Text>
            <Text color="gray.500" fontSize="sm">
              Created: {new Date(note.creationDate).toLocaleString()}
            </Text>
            {note.modificationDate && (
              <Text color="gray.500" fontSize="sm">
                Modified: {new Date(note.modificationDate).toLocaleString()}
              </Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
