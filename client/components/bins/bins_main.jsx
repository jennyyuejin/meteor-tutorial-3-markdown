import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Bins } from '../../../imports/collections/bins';
import BinsEditor from './bins_editor';
import BinsViewer from './bins_viewer';
import BinsShare from './bins_share';


class BinsMain extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('BinsMain willMount.');
    }

    render() {
        const bin = this.props.bin;
        console.log('Fetched bin:', bin);

        return (
            <div>
                <h3>Bins Main for Bin {this.props.params.binId}</h3>

                <BinsEditor bin={bin} />
                <BinsViewer bin={bin} />
                <BinsShare bin={bin} />
            </div>
        );
    }
}


// props: props of the second argument, i.e. BinsMain
export default createContainer((props) => {
    const {binId} = props.params;

    // Subscribe again, in case the user doesn't go to the root route first.
    Meteor.subscribe('bins');
    Meteor.subscribe('sharedBins');

    return { bin: Bins.findOne(binId) };
}, BinsMain);