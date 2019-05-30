import * as React from 'react';
import * as PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import FabButton from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import { List } from '../common';
import { CuePropType } from '../services/vtt.service';
import CueEditor from './cue-editor.component';

const useStyles = makeStyles({
	listRoot: {
		width: 400,
		paddingTop: 4,
		paddingBottom: 90,
		height: '100%',
		overflowY: 'scroll',
	},
	cueEditor: {
		padding: 16,
	},
	fab: {
		position: 'absolute',
		bottom: 16,
		right: 16,
	},
	fabContainer: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
});

VTTEditor.propTypes = {
	cues: PropTypes.arrayOf(CuePropType).isRequired,
	onChange: PropTypes.func.isRequired,
};

export default function VTTEditor({ cues, onChange }) {
	const classes = useStyles();

	const onChangeCue = i => cue => {
		const newCues = cues.slice();
		newCues[i] = cue;
		onChange(newCues);
	};

	const onAddCue = () => {
		if (cues.length) {
			const lastCue = cues[cues.length - 1];
			return onChange(cues.concat(new VTTCue(lastCue.endTime, lastCue.endTime + 2, '')));
		}
		return onChange([new VTTCue(0, 2, '')]);
	};

	const onRemoveCue = i => () => {
		const newCues = cues.slice();
		newCues.splice(i, 1);
		return onChange(newCues);
	};

	return (
		<div className={classes.fabContainer}>
			<List
				className={classes.listRoot}
				data={cues}
				renderItem={(cue, i, isLast) => (
					<React.Fragment>
						<div className={classes.cueEditor}>
							<CueEditor cue={cue} cueNumber={i + 1} onChange={onChangeCue(i)} onDelete={onRemoveCue(i)} />
						</div>
						{!isLast && <Divider />}
					</React.Fragment>
				)}
			/>
			<FabButton className={classes.fab} color="primary" aria-label="Add Cue" onClick={onAddCue}>
				<AddIcon />
			</FabButton>
		</div>
	);
}
