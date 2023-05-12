interface TodoType {
	id: number
	name: string
    description?: string
	completionDate?: Date
	isComplete: () => isCompleteFunction
}

isCompleteFunction = function () {
	return this.completionDate !== undefined
}

export default TodoType
