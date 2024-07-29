import { useEffect, useState } from "react";
import "./App.css";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Description from "./components/Description/Description";
import Notification from "./components/Notification/Notification";

function App() {
	const [feedback, setFeedback] = useState(() => {
		const savedFeedback = window.localStorage.getItem("feedback");
		if (savedFeedback) {
			// Преобразуем строку из localStorage в объект
			return JSON.parse(savedFeedback);
		}

		return { good: 0, neutral: 0, bad: 0 };
	});

	const updateFeedback = feedbackType => {
		// Тут використовуй сеттер, щоб оновити стан
		setFeedback(prevFeedback => ({
			...prevFeedback,
			[feedbackType]: prevFeedback[feedbackType] + 1,
		}));
	};

	const resetFeedback = () => {
		setFeedback({
			good: 0,
			neutral: 0,
			bad: 0,
		});
	};

	const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
	const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

	// Загрузка состояния из localStorage при инициализации
	useEffect(() => {
		// Преобразуем объект в строку перед сохранением
		window.localStorage.setItem("feedback", JSON.stringify(feedback));
	}, [feedback]);

	return (
		<div>
			<Description />
			<Options
				updateFeedback={updateFeedback}
				resetFeedback={resetFeedback}
				totalFeedback={totalFeedback}
			/>

			{totalFeedback > 0 ? (
				<Feedback
					good={feedback.good}
					neutral={feedback.neutral}
					bad={feedback.bad}
					totalFeedback={totalFeedback}
					positiveFeedback={positiveFeedback}
				/>
			) : (
				<Notification />
			)}
		</div>
	);
}

export default App;
