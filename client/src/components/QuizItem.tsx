import React from 'react';
import { QuizData } from '@/lib/types';
import { Eye, Play, Check, FileQuestion } from 'lucide-react';
import { formatDateTime } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface QuizItemProps {
  quiz: QuizData;
  onViewDetails: (id: number) => void;
  onStartQuiz: (id: number) => void;
}

const QuizItem: React.FC<QuizItemProps> = ({ 
  quiz, 
  onViewDetails, 
  onStartQuiz 
}) => {
  const isCompleted = quiz.submissionStatus === 'graded';
  const isAvailable = !isCompleted;
  
  const statusIcon = isCompleted ? (
    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
      <Check className="h-5 w-5" />
    </div>
  ) : (
    <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary">
      <FileQuestion className="h-5 w-5" />
    </div>
  );

  const statusText = isCompleted ? (
    <span className="text-sm font-medium text-green-600">
      Completed Mar 15 • Grade: {quiz.grade}%
    </span>
  ) : (
    <span className="text-sm font-medium text-primary">
      Available Until {formatDateTime(quiz.dueDate)}
    </span>
  );

  return (
    <div className={`p-5 ${isCompleted ? 'bg-neutral-50' : ''}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          {statusIcon}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between mb-1">
            <h3 className="font-semibold text-lg">{quiz.title}</h3>
            {statusText}
          </div>
          <div className="text-sm text-neutral-500 mb-2">
            {quiz.courseId && `Course ${quiz.courseId}`} • {quiz.pointsPossible} points • {quiz.timeLimit} minutes
          </div>
          <p className="mb-3 text-sm">{quiz.instructions}</p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium"
              onClick={() => onViewDetails(quiz.id)}
            >
              <Eye className="mr-1.5 h-4 w-4" />
              {isCompleted ? 'View Results' : 'View Details'}
            </Button>
            
            {isAvailable && (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-white font-medium"
                onClick={() => onStartQuiz(quiz.id)}
              >
                <Play className="mr-1.5 h-4 w-4" />
                Start Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
