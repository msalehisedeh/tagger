# Welcome to tagger!

Have you ever been in need of a tagger that can tag a product or show a product as a favourite or some other purpose without writing much of a code? 

[Live Demo](https://tagger.stackblitz.io) | [Source code](https://github.com/msalehisedeh/tagger/tree/master/src/app) | [Comments/Requests](https://github.com/msalehisedeh/tagger/issues)

```
DEPENDENCIES: 
	"font-awesome": "^4.7.0", 
	"@sedeh/wizard-storage": "^1.2.5"
```
## Functionalities

### Events

| Event               |Details                                                               |
|---------------------|----------------------------------------------------------------------|
|taggerChanged        |will be triggered once an item is tagged. will send tagger ID as event|

### Attributes

| Name                |Details                                                               |
|---------------------|----------------------------------------------------------------------|
|taggedClass          |Using Font-awesome or any other library, display icon to un-tag item. |
|taggableClass        |Using Font-awesome or any other library, display icon to tag item.    |
|taggerSize           |Font size of the tag icon that displays the tag/un-tag font.          |
|sticky               |If the tag icon should stick on targeted item or hid/unhide on mouse enter/exit. |
|position             |Position of tag icon on screen. choice of 'top:left', 'top:center', 'top:right', 'center:left', 'center:center', 'center:right', 'bottom:left', 'bottom:center', 'bottom:right' |
|tagger               |ID of the list in which tagged items should be added into.            |
|taggerTag            |The information that should be stored in tag list. it can be a product id, SKU, image URL, video URL, or any other relevant information for the application. |

### Service methods

| Name                |Details                                                               |
|---------------------|----------------------------------------------------------------------|
|updateTag            |Will add or remove the given info in to or out of list in session storage. |
|                     |1) id: ID of the tag items list                                       |
|                     |2) tagged: if item is tagged or tag is removed from the item          |
|                     |3) info: the information to be stored (i.e, product id, url, ...)     |
|indexOfTaggedItem    |Returns index of item in the list.                                    |
|                     |1) id: ID of the tag items list                                       |
|                     |2) info: the information to be stored (i.e, product id, url, ...)     |
|hasTaggedItem        |Returns true if item is in the list.                                  |
|                     |1) id: ID of the tag items list                                       |
|                     |2) info: the information to be stored (i.e, product id, url, ...)     |
|getTaggedItems       |Returns the list of items.                                            |
|                     |1) id: ID of the tag items list                                       |

### Sample usage

how to use it on any html node?
```javascript
Use tagger directive on a node
<span 
    tagger="image-box" 
    taggableClass="fa fa-tag" 
    taggedClass="fa fa-minus-square" 
    position="bottom:right" 
    [sticky]="true" 
    [taggerTag]="myImageUrl"
	(taggerChanged)="itemTagUpdate($event)">
	<img [src]="myImageUrl" height="100px" />
</span>
```

how to use it in conjunction with into-pipes?
```javascript
Use both into and tagger directive.
<span 
    rawContent="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" 
    into="video:auto:100px:alt text"
    intoName="video 1" intoId="video1" 

    tagger="video-box"
    taggerTag="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    (taggerChanged)="itemTagUpdate($event)">
</span>
```

Once you receive the taggerChanged notification, use the TaggerService to retreive the data for the tagger id sent to you as the event to save it in data base of your choice. 
```javascript
itemTagUpdate(event) {
    const list = this.taggerService.getTaggedItems(event);
    // save the list in database here..
}
```

## Revision History

| Version | Description                                                                                              |
|---------|----------------------------------------------------------------------------------------------------------|
| 1.0.0   | Initial Release.                                                                                         |


![alt text](https://raw.githubusercontent.com/msalehisedeh/tagger/master/sample.png  "What you would see when a tagger is used")
