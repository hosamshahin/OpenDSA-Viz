OpenDSA Interaction Logs Visualization
======================================

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## Introduction:

OpenDSA is an open-source eTextbook for data structures and algorithms (DSA)
courses that include interactive exercises to help reinforce DSA concepts.
Currently, lots of students interactions are being collected such as students
clicks, exercise attempts, and time spent to solve a given exercise. However,
analyzing OpenDSA interactions logs in a raw format is not an easy task.
Researchers need visual tools that allow them to explore the data freely and
discover trends and insights.

### [Access the live demo here.](https://opendsa-viz.herokuapp.com/)

## The Visulaization Design:

The design is split into multiple distinct views:
- Parallel Coordinates View
- Bubble View
- Total Reading Time View
- Total Reading Time Per Module View

## Parallel Coordinates View:

[<img src="https://github.com/hosamshahin/OpenDSA-Viz/blob/master/images/parallel.png">](https://opendsa-viz.herokuapp.com/home.html)

The parallel coordinates view is split into two sections which consist of the
parallel coordinates themselves and the raw data underneath in a table.

Using parallel coordinates, it is applicable to show the full dimensionality of
the data without aggregated metrics. This allows analysts to find patterns all
the way to the raw data level without sacrificing usability. Each category of
data is colored differently so that patterns are easier to see. Thickness could
be added to the lines to store yet another visual variable but decided against
it because it would make the screen cluttered and have issues with obscuring
smaller lines.

The parallel coordinates view is highly interactive, supporting filtering, re-
ordering (sorting), and selection of the data.

[<img src="https://github.com/hosamshahin/OpenDSA-Viz/blob/master/images/filter.png">](https://opendsa-viz.herokuapp.com/home.html)


Single or multiple dimensions can be filtered by clicking and dragging along the
axis to select the lower and upper threshold, and the filter can be dragged up
and down along the line. This enables a technique where the analyst can select a
thin slice of a dimension and slowly translate it up or down, revealing
intersecting lines as it moves. This technique can lead to interesting patterns
and insights.

The coordinates can be reordered left and right so that relationships between
any of the dimensions can be explored.

[<img src="https://github.com/hosamshahin/OpenDSA-Viz/blob/master/images/parallel_filtered.png">](https://opendsa-viz.herokuapp.com/home.html)

The raw data table underneath the graph updates dynamically whenever the analyst
filters data in the parallel coordinates. Additionally, hovering over any of the
data rows will highlight the corresponding line in the parallel coordinates.
This connection between the data table and the parallel coordinates enables
quick and easy exploration of the raw data.

## Bubble View:
[<img src="https://github.com/hosamshahin/OpenDSA-Viz/blob/master/images/bubble.png">](https://opendsa-viz.herokuapp.com/ex_analysis_bubble.html)

The bubble view consists of a large central region with bubbles surrounded by
various controls. To stay consistent with the parallel coordinates view, the
bubbles in the bubble view are colored by exercise type. The bubbles are laid
out in a spiral pattern with the largest at the center, shrinking as you go out
counterclockwise. This pattern makes it very easy to pick out the relative
weights of each of the exercises and to identify outliers. For example, in the
image above it is immediately apparent that the largest of the bubbles are
almost all summary exercises, while JSAV exercises are the smallest.

[<img src="https://github.com/hosamshahin/OpenDSA-Viz/blob/master/images/bubble2.png">](https://opendsa-viz.herokuapp.com/ex_analysis_bubble.html)

The bubble view implements interactivity through its controls. On the right side
are several slider bars - one for each dimension. These slider bars allow the
analysts to assign weights to each of the dimensions which are multiplied by the
dimension value and summed together to calculate the size of the bubbles. Along
the top is an exercise filter which allows analysts to filter their search for
only exercises which match a percentage of the weighted average.


## Total Reading Time View:
[<img src="https://github.com/hosamshahin/OpenDSA-Viz/blob/master/images/reading_time.png">](https://opendsa-viz.herokuapp.com/reading_time.html)

The total reading time view is a stacked chart that shows students reading time
for all OpenDSA modules per a day. Students might start reading any of the
OpenDSA modules then leave it open and do anything else. In this case reading
time captured by the system is not the accurate time students spent to learn the
materials in a module. This type of students behaviors results in outliers in
the data. During the outliers data analysis time, data was corrected by removing
the outliers entirely, replace the outlier reading sessions with the median time
of all students reading sessions, or replace the outliers with the upper value
of the whisker. In this view, the researcher can choose which data correction
technique to show by selecting one of the options on the upper right corner of
the graph.

## Total Reading Time Per Module View:
[<img src="https://github.com/hosamshahin/OpenDSA-Viz/blob/master/images/reading_time_module.png">](https://opendsa-viz.herokuapp.com/reading_time_module.html)

Unlike the previous view, this view shows the per module analysis of total
students reading time. It helps OpenDSA analysts to discover the reading
behaviors of the students. This view can be used to answer many questions like,
when exactly students study the materials? combined with the previous view, do
the students read the modules just before the midterm exams or when the
assignments are due? what are the modules that students come to read later in
the semester even after the exams? what are the modules that students spend more
time studying than the others?

## Insight Goals:

The central insight goal is to allow analysts of the OpenDSA online textbook to
find useful insights in usage data that will help developers to improve OpenDSA.

The separate views allow analysts to focus on either big-picture patterns (with
the bubble view) or raw data patterns (with the parallel coordinates view)
depending on the type of insight they are seeking. The interactive features
allow analysts to both filter out data points they aren’t looking for and find
insight.

The types of insights the visualization can help uncover will accomplish the
insight goals when the analyst shares their insights with the developers.
Developers can learn which exercises are too difficult and may require some
extra hints or explanation, as well as which ones are too easy or are skipped
entirely. They can also learn about the differences in the classes of exercises,
the most popular exercises for studying after students got the  proficiency, and
the relationships between hints and student proficiency. Using these insights,
the developers of OpenDSA will be able to improve the textbook to better help
the students.

### [Access the live demo here.](https://opendsa-viz.herokuapp.com/)
