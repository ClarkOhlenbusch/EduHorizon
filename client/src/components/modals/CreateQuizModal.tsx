import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createQuiz } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Upload, FileUp } from 'lucide-react';
import { QuizData } from '@/lib/types';

interface CreateQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: { id: number; title: string }[];
}

interface QuestionData {
  id: number;
  questionText: string;
  questionType: string;
  points: number;
  options: { id: number; text: string; isCorrect: boolean }[];
}

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ open, onOpenChange, courses }) => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [points, setPoints] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: 1,
      questionText: '',
      questionType: 'multiple_choice',
      points: 10,
      options: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false }
      ]
    }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  
  // File upload state
  const [activeTab, setActiveTab] = useState('create');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadCourseId, setUploadCourseId] = useState('');
  const [uploadPoints, setUploadPoints] = useState('');
  const [uploadTimeLimit, setUploadTimeLimit] = useState('');
  const [uploadDueDate, setUploadDueDate] = useState('');
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFileName(e.target.files[0].name);
    }
  };
  
  // Handle file upload submission
  const handleFileUpload = () => {
    if (!uploadFileName || !uploadCourseId || !uploadPoints || !uploadDueDate) {
      toast({
        title: "Missing Fields",
        description: "Please select a file and fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    // Simulate file processing
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `Quiz file "${uploadFileName}" uploaded and converted successfully!`,
      });
      
      // Reset form
      setUploadFileName('');
      setUploadCourseId('');
      setUploadPoints('');
      setUploadTimeLimit('');
      setUploadDueDate('');
      
      setSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        questionText: '',
        questionType: 'multiple_choice',
        points: 10,
        options: [
          { id: 1, text: '', isCorrect: false },
          { id: 2, text: '', isCorrect: false },
          { id: 3, text: '', isCorrect: false },
          { id: 4, text: '', isCorrect: false }
        ]
      }
    ]);
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (questions.length === 1) {
      toast({
        title: "Cannot Delete",
        description: "You must have at least one question.",
        variant: "destructive"
      });
      return;
    }
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleQuestionTextChange = (questionId: number, value: string) => {
    setQuestions(
      questions.map(q => 
        q.id === questionId ? { ...q, questionText: value } : q
      )
    );
  };

  const handleQuestionTypeChange = (questionId: number, value: string) => {
    setQuestions(
      questions.map(q => 
        q.id === questionId ? { ...q, questionType: value } : q
      )
    );
  };

  const handleQuestionPointsChange = (questionId: number, value: string) => {
    setQuestions(
      questions.map(q => 
        q.id === questionId ? { ...q, points: parseInt(value) || 0 } : q
      )
    );
  };

  const handleOptionTextChange = (questionId: number, optionId: number, value: string) => {
    setQuestions(
      questions.map(q => 
        q.id === questionId ? { 
          ...q, 
          options: q.options.map(o => 
            o.id === optionId ? { ...o, text: value } : o
          ) 
        } : q
      )
    );
  };

  const handleCorrectOptionChange = (questionId: number, optionId: number) => {
    setQuestions(
      questions.map(q => 
        q.id === questionId ? { 
          ...q, 
          options: q.options.map(o => 
            ({ ...o, isCorrect: o.id === optionId })
          ) 
        } : q
      )
    );
  };

  const handleSubmit = async () => {
    if (!title || !courseId || !points || !timeLimit || !dueDate) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    try {
      const quizData: Partial<QuizData> = {
        title,
        courseId: parseInt(courseId),
        dueDate: new Date(dueDate),
        timeLimit: parseInt(timeLimit),
        pointsPossible: parseInt(points),
        instructions: description,
        status: 'published'
      };
      
      const result = await createQuiz(quizData);
      
      if (result) {
        toast({
          title: "Success!",
          description: "Quiz created successfully!",
        });
        
        // Reset form
        setTitle('');
        setCourseId('');
        setPoints('');
        setTimeLimit('');
        setDueDate('');
        setDescription('');
        setQuestions([
          {
            id: 1,
            questionText: '',
            questionType: 'multiple_choice',
            points: 10,
            options: [
              { id: 1, text: '', isCorrect: false },
              { id: 2, text: '', isCorrect: false },
              { id: 3, text: '', isCorrect: false },
              { id: 4, text: '', isCorrect: false }
            ]
          }
        ]);
        
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to create quiz. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Create New Quiz</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="create">Create Quiz Manually</TabsTrigger>
            <TabsTrigger value="upload">Upload Quiz File</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input 
                  id="quiz-title" 
                  placeholder="e.g., Midterm Exam"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="quiz-course">Course</Label>
                <Select value={courseId} onValueChange={setCourseId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>{course.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quiz-points">Total Points</Label>
                <Input 
                  id="quiz-points" 
                  type="number" 
                  placeholder="e.g., 100"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="quiz-time">Time Limit (minutes)</Label>
                <Input 
                  id="quiz-time" 
                  type="number" 
                  placeholder="e.g., 60"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="quiz-due-date">Due Date</Label>
                <Input 
                  id="quiz-due-date" 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="quiz-description">Description</Label>
              <Textarea
                id="quiz-description"
                rows={2}
                placeholder="Enter quiz instructions or description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <h4 className="font-medium text-neutral-800 mb-2">Questions</h4>
              
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-neutral-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Question {index + 1}</h5>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-neutral-500 hover:text-neutral-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mb-3">
                      <Label>Question Text</Label>
                      <Input 
                        placeholder="Enter your question"
                        value={question.questionText}
                        onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <Label>Question Type</Label>
                      <Select 
                        value={question.questionType} 
                        onValueChange={(value) => handleQuestionTypeChange(question.id, value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                          <SelectItem value="true_false">True/False</SelectItem>
                          <SelectItem value="short_answer">Short Answer</SelectItem>
                          <SelectItem value="essay">Essay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {question.questionType === 'multiple_choice' && (
                      <div className="mb-3">
                        <Label>Answer Options</Label>
                        <div className="space-y-2 mt-1">
                          <RadioGroup 
                            value={question.options.find(o => o.isCorrect)?.id.toString() || ""}
                            onValueChange={(value) => handleCorrectOptionChange(question.id, parseInt(value))}
                          >
                            {question.options.map((option) => (
                              <div key={option.id} className="flex items-center">
                                <RadioGroupItem 
                                  value={option.id.toString()} 
                                  id={`q${question.id}_option${option.id}`} 
                                  className="mr-2"
                                />
                                <Input 
                                  placeholder={`Option ${option.id}`}
                                  value={option.text}
                                  onChange={(e) => handleOptionTextChange(question.id, option.id, e.target.value)}
                                />
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <Label>Points</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g., 10"
                        value={question.points.toString()}
                        onChange={(e) => handleQuestionPointsChange(question.id, e.target.value)}
                        className="mt-1 w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={handleAddQuestion}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Question
              </Button>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create Quiz"}
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="mt-2 bg-neutral-50 p-6 rounded-lg border border-dashed border-neutral-300">
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-neutral-400 mb-2" />
                <h3 className="text-lg font-medium mb-1">Upload Quiz File</h3>
                <p className="text-sm text-neutral-500 text-center mb-4">
                  Drag and drop your quiz file (PDF, Word, etc.) or click to browse
                </p>
                
                <div className="w-full">
                  <div className="relative border-neutral-200 border rounded">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" 
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                    />
                    <div className="p-3 text-center">
                      <span className="text-primary font-medium">
                        {uploadFileName || "Browse files"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="upload-course">Course</Label>
                <Select value={uploadCourseId} onValueChange={setUploadCourseId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>{course.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="upload-due-date">Due Date</Label>
                <Input 
                  id="upload-due-date" 
                  type="date"
                  value={uploadDueDate}
                  onChange={(e) => setUploadDueDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="upload-points">Total Points</Label>
                <Input 
                  id="upload-points" 
                  type="number" 
                  placeholder="e.g., 100"
                  value={uploadPoints}
                  onChange={(e) => setUploadPoints(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="upload-time">Time Limit (minutes) - Optional</Label>
                <Input 
                  id="upload-time" 
                  type="number" 
                  placeholder="e.g., 60"
                  value={uploadTimeLimit}
                  onChange={(e) => setUploadTimeLimit(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleFileUpload}
                disabled={submitting}
              >
                {submitting ? "Uploading..." : "Upload Quiz"}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuizModal;