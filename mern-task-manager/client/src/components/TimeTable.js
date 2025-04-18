// client/src/components/TimeTable.js
import React, { useState, useEffect } from 'react';

function TimeTable() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [newActivity, setNewActivity] = useState('');
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('10:00');
  const [editIndex, setEditIndex] = useState(null);
  const [useCustomTime, setUseCustomTime] = useState(false);

  // Load time slots from local storage
  useEffect(() => {
    const savedTimeSlots = localStorage.getItem('timeTableSlots');
    if (savedTimeSlots) {
      setTimeSlots(JSON.parse(savedTimeSlots));
    } else {
      // Initialize with empty slots
      setTimeSlots([]);
    }
  }, []);

  // Save to local storage when timeSlots change
  useEffect(() => {
    localStorage.setItem('timeTableSlots', JSON.stringify(timeSlots));
  }, [timeSlots]);

  const handleAddActivity = (e) => {
    e.preventDefault();
    
    if (!newActivity.trim()) return;
    
    if (editIndex !== null) {
      // Update existing time slot
      const updatedSlots = [...timeSlots];
      updatedSlots[editIndex] = {
        ...updatedSlots[editIndex],
        activity: newActivity,
        fromTime: fromTime,
        toTime: toTime
      };
      setTimeSlots(updatedSlots.sort(sortByTime));
      setEditIndex(null);
    } else {
      // Create new time slot
      const newSlot = {
        fromTime: fromTime,
        toTime: toTime,
        activity: newActivity
      };
      
      // Insert and sort by time
      const updatedSlots = [...timeSlots, newSlot].sort(sortByTime);
      setTimeSlots(updatedSlots);
    }
    
    // Reset form
    setNewActivity('');
    setFromTime('09:00');
    setToTime('10:00');
  };

  const sortByTime = (a, b) => {
    return a.fromTime.localeCompare(b.fromTime);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewActivity(timeSlots[index].activity);
    setFromTime(timeSlots[index].fromTime);
    setToTime(timeSlots[index].toTime);
    setUseCustomTime(true);
  };

  const handleDelete = (index) => {
    const updatedSlots = [...timeSlots];
    updatedSlots.splice(index, 1);
    setTimeSlots(updatedSlots);
  };

  const handleClearAll = () => {
    setTimeSlots([]);
  };

  // Generate time options from 00:00 to 23:59 in 15-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const timeValue = `${formattedHour}:${formattedMinute}`;
        options.push(
          <option key={timeValue} value={timeValue}>
            {timeValue}
          </option>
        );
      }
    }
    return options;
  };

  return (
    <div className="timetable-container">
      <div className="timetable-header">
        <h2>Daily Schedule</h2>
        <button className="clear-btn" onClick={handleClearAll}>Clear All</button>
      </div>
      
      <form onSubmit={handleAddActivity} className="timetable-form">
        <div className="time-input-toggle">
          <label className="custom-time-label">
            <input 
              type="checkbox" 
              checked={useCustomTime} 
              onChange={() => setUseCustomTime(!useCustomTime)} 
            />
            Use custom time format
          </label>
        </div>
        
        <div className="form-controls">
          <div className="time-inputs">
            <div className="form-control">
              <label htmlFor="from-time">From:</label>
              {useCustomTime ? (
                <input
                  type="time"
                  id="from-time"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  required
                />
              ) : (
                <select
                  id="from-time-select"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                >
                  {generateTimeOptions()}
                </select>
              )}
            </div>
            
            <div className="form-control">
              <label htmlFor="to-time">To:</label>
              {useCustomTime ? (
                <input
                  type="time"
                  id="to-time"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  required
                />
              ) : (
                <select
                  id="to-time-select"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                >
                  {generateTimeOptions()}
                </select>
              )}
            </div>
          </div>
          
          <div className="form-control activity-input">
            <label htmlFor="activity">Activity:</label>
            <input
              type="text"
              id="activity"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Enter activity"
              required
            />
          </div>
          
          <button type="submit" className="btn">
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
      
      <div className="timetable-slots">
        {timeSlots.length === 0 ? (
          <div className="no-activities">No activities scheduled. Add one to get started!</div>
        ) : (
          timeSlots.map((slot, index) => (
            <div key={index} className="time-slot">
              <div className="time-label">
                {slot.fromTime} - {slot.toTime}
              </div>
              <div className="time-activity">{slot.activity}</div>
              <div className="slot-actions">
                <button 
                  onClick={() => handleEdit(index)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(index)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TimeTable;