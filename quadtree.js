const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const MAX_POINTS = 8;

// Splits region into quadrants
function splitRegion(region) {
	const { x, y, width, height, points } = region;
	const midX = x + width / 2;
	const midY = y + height / 2;

	// Create quadrants
	const subregions = [
		{ x, y, width: width / 2, height: height / 2, points: [] },
		{ x: midX, y, width: width / 2, height: height / 2, points: [] },
		{ x, y: midY, width: width / 2, height: height / 2, points: [] },
		{ x: midX, y: midY, width: width / 2, height: height / 2, points: [] }
	];

	// Assign each point to the correct quadrant
	for (const p of points) {
		for (const r of subregions) {
			if (p.x >= r.x && p.x <= r.x + r.width
				&& p.y >= r.y && p.y <= r.y + r.height
			) {
				r.points.push(p);
				break;
			}
		}
	}

	return subregions;
}

// Returns flat list of all regions
function quadTree(width, height, points) {
	const allRegions = [];
	const rootRegion = {
		x: 0,
		y: 0,
		width,
		height,
		points: points
	}

	// Recusivley generate quadtree
	function subDivide(region) {
		// Base case: valid quadrant
		if (region.points.length <= MAX_POINTS) {
			allRegions.push(region);
			return;
		}

		// Split region into quadrants
		const subRegions = splitRegion(region);

		// Now try to subDivide each region
		for (const r of subRegions) {
			subDivide(r);
		}
	}

	subDivide(rootRegion);

	return allRegions;
}