import { useState, useEffect, useCallback } from 'react'

const useScroll = (scrollThreshold = 100) => {
	const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false)

	const handleScroll = useCallback(() => {
		if (window.scrollY > scrollThreshold) {
			setScrolledPastThreshold(true)
		} else {
			setScrolledPastThreshold(false)
		}
	}, [scrollThreshold])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [handleScroll])

	return scrolledPastThreshold
}

export default useScroll
