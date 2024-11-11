'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'next/navigation';

// Define los tipos de los datos que se usarán
type Question = {
  id: number;
  questionText: string;
  type: string;
  options?: string[];
};

export default function EditForm() {
  const { id } = useParams(); // Utilizamos useParams para obtener el ID
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState<string>('');
  const [questionType, setQuestionType] = useState<string>('TEXT');
  const [options, setOptions] = useState<string[]>(['']);

  useEffect(() => {
    if (id) {
      fetchQuestions(id as string);
    }
  }, [id]);

  // Fetch de preguntas de la API
  const fetchQuestions = async (formId: string) => {
    const res = await fetch(`/api/forms/${formId}/questions`);
    const data: Question[] = await res.json();
    setQuestions(data);
  };

  // Añadir una nueva pregunta
  const handleAddQuestion = async () => {
    if (!questionText || !id) return;

    const response = await fetch(`/api/forms/${id}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionText,
        type: questionType,
        options: questionType !== 'TEXT' && questionType !== 'DATE' ? options : [],
      }),
    });

    if (response.ok) {
      fetchQuestions(id as string);
      setQuestionText('');
      setOptions(['']);
    }
  };

  // Cambiar opciones para las preguntas que las tienen
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, '']);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Editar Formulario</h1>

      {/* Crear Pregunta */}
      <div className="mt-4">
        <input
          type="text"
          value={questionText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestionText(e.target.value)}
          placeholder="Escribe tu pregunta"
          className="border p-2 w-full"
        />

        <select
          value={questionType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setQuestionType(e.target.value)}
          className="border p-2 mt-4 w-full"
        >
          <option value="TEXT">Texto</option>
          <option value="MULTIPLE_CHOICE">Opción Múltiple</option>
          <option value="SINGLE_CHOICE">Una Opción</option>
          <option value="DROPDOWN">Dropdown</option>
          <option value="DATE">Fecha</option>
        </select>

        {['MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'DROPDOWN'].includes(questionType) && (
          <div className="mt-4">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleOptionChange(index, e.target.value)}
                  className="border p-2 w-full"
                  placeholder={`Opción ${index + 1}`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-blue-500 mt-2"
            >
              + Añadir Opción
            </button>
          </div>
        )}

        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        >
          Añadir Pregunta
        </button>
      </div>

      {/* Listar Preguntas */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Preguntas</h2>
        {questions.map((question) => (
          <div key={question.id} className="border p-4 mt-4 rounded-md">
            <p>{question.questionText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
