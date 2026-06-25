import React from 'react';
import SectionHeader from '../../ui/SectionHeader';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Select from '../../ui/Select';

const parse12to24 = (time12) => {
  if (!time12 || typeof time12 !== 'string') return '';
  const match = time12.match(/(\d+):(\d+)\s?(AM|PM)/i);
  if (!match) return '';
  let [h, m, mod] = [parseInt(match[1]), match[2], match[3].toUpperCase()];
  if (mod === 'PM' && h < 12) h += 12;
  if (mod === 'AM' && h === 12) h = 0;
  return `${h.toString().padStart(2, '0')}:${m}`;
};

const format24to12 = (time24) => {
  if (!time24) return '';
  const match = time24.match(/(\d+):(\d+)/);
  if (!match) return time24;
  let [h, m] = [parseInt(match[1], 10), match[2]];
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
};

const WorkingHoursBlock = ({ profile, setProfile }) => {
  return (
    <div style={{ flex: 1 }}>
      <SectionHeader title="Working Hours" color="#48BB78" />
      
      {profile.working_hours.map((wh, idx) => {
        
        // Build Time Options
        const timeOptions = [];
        for (let i = 0; i < 24 * 2; i++) {
           const hour24 = Math.floor(i / 2);
           const m = i % 2 === 0 ? '00' : '30';
           let h12 = hour24 % 12 || 12;
           const ampm = hour24 >= 12 ? 'PM' : 'AM';
           timeOptions.push(`${h12.toString().padStart(2, '0')}:${m} ${ampm}`);
        }

        const dayPresets = ["Monday - Friday", "Monday - Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Everyday", "Weekends"];
        const statusPresets = ["Open", "Closed", "Weekly Off", "Holiday", "24 Hours"];
        
        // Determine internal state
        let currentStatus = "Open";
        let startTime = "10:00 AM";
        let endTime = "06:00 PM";
        
        if (["CLOSED", "WEEKLY OFF", "HOLIDAY", "24 HOURS"].includes(wh.hours?.toUpperCase())) {
            currentStatus = wh.hours?.toUpperCase() === "WEEKLY OFF" ? "Weekly Off" : 
                            wh.hours?.toUpperCase() === "HOLIDAY" ? "Holiday" : 
                            wh.hours?.toUpperCase() === "24 HOURS" ? "24 Hours" : "Closed";
        } else if (wh.hours && wh.hours.includes(' - ')) {
            const parts = wh.hours.split(' - ');
            if (parts.length === 2 && timeOptions.includes(parts[0]) && timeOptions.includes(parts[1])) {
                startTime = parts[0];
                endTime = parts[1];
            }
        }

        const updateField = (field, val) => {
            const n = [...profile.working_hours];
            n[idx] = { ...n[idx], [field]: val };
            setProfile({...profile, working_hours: n});
        };

        const handleStatusChange = (newStatus) => {
            if (newStatus === "Open") {
                updateField("hours", "10:00 AM - 06:00 PM");
            } else if (newStatus === "24 Hours") {
                updateField("hours", "24 Hours");
            } else {
                updateField("hours", newStatus);
            }
        };
        
        const handleTimeChange = (pos, val) => {
            const parts = [startTime, endTime];
            parts[pos] = val;
            updateField("hours", parts.join(' - '));
        };

        return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', position: 'relative' }}>
              
              <button 
                aria-label="Remove working hours"
                title="Remove working hours"
                onClick={(e) => { e.preventDefault(); setProfile({...profile, working_hours: profile.working_hours.filter((_, i) => i !== idx)}); }} 
                style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >✕</button>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                   <Label style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Day / Range</Label>
                   {dayPresets.includes(wh.days) || !wh.days ? (
                     <Select value={dayPresets.includes(wh.days) ? wh.days : "Monday - Friday"} onChange={(e) => updateField("days", e.target.value)}>
                        <option value="" disabled>Select Day</option>
                        {dayPresets.map(d => <option key={d} value={d}>{d}</option>)}
                        <option value="Custom">Custom...</option>
                     </Select>
                   ) : (
                     <div style={{ display: 'flex', gap: '4px' }}>
                       <Input type="text" value={wh.days} onChange={(e) => updateField("days", e.target.value)} placeholder="Type day..." />
                       <Button aria-label="Reset to Monday - Friday" title="Reset to Monday - Friday" variant="secondary" size="icon" onClick={(e) => { e.preventDefault(); updateField("days", "Monday - Friday"); }}>↺</Button>
                     </div>
                   )}
                </div>

                <div style={{ width: '120px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                   <Label style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Status</Label>
                   <Select value={currentStatus} onChange={(e) => handleStatusChange(e.target.value)} style={{ fontWeight: 600, color: currentStatus === 'Open' ? '#38a169' : '#e53e3e' }}>
                      {statusPresets.map(sp => <option key={sp} value={sp}>{sp}</option>)}
                   </Select>
                </div>
              </div>

              {currentStatus === "Open" && (
                 <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                       <Label style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Opening Time</Label>
                       <Select value={startTime} onChange={(e) => handleTimeChange(0, e.target.value)}>
                          {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                       </Select>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                       <Label style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Closing Time</Label>
                       <Select value={endTime} onChange={(e) => handleTimeChange(1, e.target.value)}>
                          {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                       </Select>
                    </div>
                 </div>
              )}
            </div>
        );
      })}
      
      <Button variant="success" size="sm" onClick={(e) => { 
        e.preventDefault(); 
        setProfile({...profile, working_hours: [...profile.working_hours, { days: 'Monday - Friday', hours: '10:00 AM - 06:00 PM' }]}); 
      }}>
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> 
         Add Working Hours
      </Button>
    </div>
  );
};

export default WorkingHoursBlock;
